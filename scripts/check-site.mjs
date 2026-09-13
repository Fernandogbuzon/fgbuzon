// Optional QA tool: reuse an installed Playwright via PLAYWRIGHT_MODULE (file URL),
// or install Playwright in the environment. No browser library ships with the site.
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
const { chromium, webkit } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const origin = process.env.SITE_TEST_URL || "http://127.0.0.1:4173";
const report = {
  generatedAt: new Date().toISOString(),
  layouts: [],
  checks: [],
  errors: [],
};
await mkdir("artifacts", { recursive: true });
const check = (name, result) => {
  assert.ok(result, name);
  report.checks.push(name);
};
const theme = (page, value) =>
  page.waitForFunction(
    (v) => document.documentElement.dataset.theme === v,
    value,
  );
const ready = (page) =>
  page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => i.decode()));
  });
const overflow = (page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);

for (const [name, engine, widths] of [
  ["chromium", chromium, [320, 390, 768, 1440]],
  ["webkit", webkit, [390, 1440]],
]) {
  const browser = await engine.launch();
  try {
    for (const width of widths) {
      for (const colorScheme of ["light", "dark"]) {
        const context = await browser.newContext({
          viewport: { width, height: 960 },
          colorScheme,
        });
        const page = await context.newPage();
        const requests = [];
        page.on("pageerror", (e) => report.errors.push(e.message));
        page.on("console", (m) => {
          if (m.type() === "error") report.errors.push(m.text());
        });
        page.on("request", (r) => requests.push(r.url()));
        page.on("response", (r) => {
          if (r.status() >= 400) report.errors.push(`${r.status()} ${r.url()}`);
        });
        await page.goto(origin);
        await ready(page);
        await theme(page, colorScheme);
        check(
          `${name} ${width} ${colorScheme}: sin desbordamiento`,
          await overflow(page),
        );
        check(
          `${name} ${width} ${colorScheme}: recursos propios`,
          requests.every((url) => new URL(url).origin === origin),
        );
        const captures = requests.filter((url) => /adesa80-.*\.webp/.test(url));
        check(
          `${name} ${width} ${colorScheme}: capturas de escritorio y móvil`,
          captures.length === 2 &&
            captures.some((url) => url.includes("-desktop")) &&
            captures.some((url) => url.includes("-mobile")),
        );
        report.layouts.push({ name, width, colorScheme, captures });
        if (width === 390) {
          check(
            `${name} ${colorScheme}: variantes ligeras a 390 px y DPR 1`,
            captures.some((url) => url.endsWith("adesa80-desktop-480.webp")) &&
              captures.some((url) => url.endsWith("adesa80-mobile-160.webp")),
          );
        }
        check(
          "Sin almacenamiento hasta una elección manual",
          await page.evaluate(() => localStorage.length === 0),
        );
        check("Sin cookies propias", (await context.cookies()).length === 0);
        await page.getByLabel(/^Apariencia:/).click();
        await page.getByRole("radio", { name: "Oscuro", exact: true }).check();
        await theme(page, "dark");
        await page.keyboard.press("Escape");
        check(
          "Escape devuelve el foco a Apariencia",
          await page
            .getByLabel("Apariencia: Oscuro")
            .evaluate((e) => e === document.activeElement),
        );
        await page.reload();
        await theme(page, "dark");
        if (width < 760) {
          await page.getByLabel("Abrir menú de navegación").click();
          await page
            .getByRole("navigation", { name: "Navegación móvil" })
            .getByRole("link", { name: "Servicios", exact: true })
            .click();
          check(
            "Menú se cierra al navegar",
            await page.locator(".mobile-navigation").evaluate((e) => !e.open),
          );
        }
        await page.locator(".faq-list summary").first().click();
        check(
          "FAQ abierta",
          await page
            .locator(".faq-list details")
            .first()
            .evaluate((e) => e.open),
        );
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
}

const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  await page.goto(origin);
  check(
    "Siete secciones, cinco preguntas",
    (await page.locator("main > section").count()) === 7 &&
      (await page.locator(".faq-list details").count()) === 5,
  );
  check(
    "Sin antetítulos ni números decorativos",
    (await page
      .locator(".section-kicker, .eyebrow, .step-number, .service-topline")
      .count()) === 0,
  );
  const links = await page
    .locator("a")
    .evaluateAll((nodes) => nodes.map((n) => n.href));
  const whatsapp = links.filter((l) => l.startsWith("https://wa.me/"));
  check(
    "WhatsApp y mensaje correctos",
    whatsapp.length === 2 &&
      whatsapp.every(
        (l) =>
          new URL(l).pathname === "/34674036944" &&
          new URL(l).searchParams.get("text") ===
            "Hola, Fernando. Quiero comentarte una web o una herramienta que necesito",
      ),
  );
  check(
    "Canales de contacto correctos",
    [
      "tel:+34674036944",
      "mailto:rrss@fgbuzon.com",
      "https://www.instagram.com/fgbuzon/",
      "https://adesa80.com/",
    ].every((l) => links.includes(l)),
  );
  await page.keyboard.press("Tab");
  check(
    "Primer foco: saltar al contenido",
    await page
      .getByRole("link", { name: "Saltar al contenido" })
      .evaluate((e) => e === document.activeElement),
  );
  await page.keyboard.press("Enter");
  check(
    "Saltar al contenido funciona",
    await page.locator("main").evaluate((e) => e === document.activeElement),
  );
  await page.getByLabel(/^Apariencia:/).focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowDown");
  check(
    "Radio claro con flecha",
    await page.getByRole("radio", { name: "Claro", exact: true }).isChecked(),
  );
  await page.keyboard.press("ArrowDown");
  await theme(page, "dark");
  check(
    "El selector permanece abierto para el teclado",
    await page.locator(".appearance-menu").evaluate((e) => e.open),
  );
  check(
    "Teclado sin animaciones",
    await page.evaluate(() => document.getAnimations().length === 0),
  );
  await page.getByRole("radio", { name: "Sistema", exact: true }).check();
  await page.emulateMedia({ colorScheme: "dark" });
  await theme(page, "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await theme(page, "light");
  await page.getByRole("radio", { name: "Oscuro", exact: true }).check();
  await page.emulateMedia({ colorScheme: "light" });
  await theme(page, "dark");
  const other = await context.newPage();
  await other.goto(origin);
  await theme(other, "dark");
  await other.evaluate(() => localStorage.setItem("fgbuzon-theme", "light"));
  await theme(page, "light");
  await other.evaluate(() => localStorage.clear());
  await theme(page, "light");
  check(
    "Sincronización entre pestañas",
    await page.evaluate(
      () => document.documentElement.dataset.preference === "system",
    ),
  );
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByLabel("Abrir menú de navegación").click();
  check(
    "Movimiento reducido sin animaciones",
    await page.evaluate(() => document.getAnimations().length === 0),
  );
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByLabel("Abrir menú de navegación").click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() => document.getAnimations().length === 0);
  check(
    "Movimiento reducido interrumpe la animación",
    await page
      .locator(".mobile-navigation nav")
      .evaluate(
        (e) =>
          getComputedStyle(e).transform === "none" &&
          getComputedStyle(e).opacity === "1",
      ),
  );
  await page.keyboard.press("Escape");
  for (let i = 0; i < 6; i++)
    await page.locator(".mobile-navigation summary").click();
  check(
    "Pulsaciones rápidas conservan el estado",
    await page.locator(".mobile-navigation").evaluate((e) => !e.open),
  );
  await page.getByLabel(/^Apariencia:/).click();
  await page.locator(".hero-description").click();
  check(
    "Clic externo cierra selector",
    await page.locator(".appearance-menu").evaluate((e) => !e.open),
  );
  await page.setViewportSize({ width: 720, height: 900 });
  await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
  check("Ampliación de texto al 200%", await overflow(page));
  await context.close();

  for (const blocked of ["storage", "invalid", "javascript"]) {
    const ctx = await browser.newContext({
      javaScriptEnabled: blocked !== "javascript",
      colorScheme: "dark",
      viewport: { width: 390, height: 844 },
    });
    const p = await ctx.newPage();
    if (blocked === "storage")
      await p.addInitScript(() =>
        Object.defineProperty(window, "localStorage", {
          get() {
            throw new DOMException("Blocked", "SecurityError");
          },
        }),
      );
    if (blocked === "invalid")
      await p.addInitScript(() =>
        localStorage.setItem("fgbuzon-theme", "bad-value"),
      );
    await p.goto(origin);
    if (blocked !== "javascript") {
      await theme(p, "dark");
      await p.getByLabel(/^Apariencia:/).click();
      await p.getByRole("radio", { name: "Claro", exact: true }).check();
      await theme(p, "light");
    } else {
      check(
        "Selector oculto sin JS",
        await p.locator(".appearance-menu").isHidden(),
      );
      check(
        "Tema oscuro del sistema sin JS",
        await p
          .locator("body")
          .evaluate(
            (e) => getComputedStyle(e).backgroundColor === "rgb(11, 20, 16)",
          ),
      );
      await p.locator(".mobile-navigation summary").click();
      check(
        "Menú nativo sin JS",
        await p
          .getByRole("navigation", { name: "Navegación móvil" })
          .isVisible(),
      );
      await p.locator(".faq-list summary").first().click();
      check(
        "FAQ nativa sin JS",
        await p
          .locator(".faq-list details")
          .first()
          .evaluate((e) => e.open),
      );
    }
    report.checks.push(`Fallback ${blocked}`);
    await ctx.close();
  }
  for (const path of ["/", "/aviso-legal/", "/privacidad/", "/cookies/"]) {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    check(
      `${path}: respuesta 200`,
      (await p.goto(origin + path)).status() === 200,
    );
    await p.reload();
    await ready(p);
    check(`${path}: sin desbordamiento`, await overflow(p));
    const metadata = await p
      .locator("head meta[name], head meta[property]")
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute("name") || n.getAttribute("property")),
      );
    check(
      `${path}: metadatos únicos`,
      new Set(metadata).size === metadata.length,
    );
    check(
      `${path}: noindex mientras se completa la información legal`,
      (await p.locator('meta[name="robots"]').getAttribute("content")) ===
        "noindex, nofollow",
    );
    check(
      `${path}: canonical de destino`,
      (await p.locator('link[rel="canonical"]').getAttribute("href")) ===
        "https://fgbuzon.com" + path,
    );
    check(
      `${path}: imagen al compartir`,
      (await p.locator('meta[property="og:image"]').getAttribute("content")) ===
        "https://fgbuzon.com/assets/og-fgbuzon.png" &&
        (await p.locator('meta[name="twitter:card"]').getAttribute("content")) ===
          "summary_large_image",
    );
    if (path !== "/") {
      check(
        `${path}: aviso de revisión`,
        await p
          .getByText("Documento en revisión.", { exact: true })
          .isVisible(),
      );
      await p
        .getByRole("link", { name: "Volver al inicio", exact: false })
        .click();
      await p.waitForURL(origin + "/");
    }
    await p.close();
  }
} finally {
  await browser.close();
}

for (const slug of ["aviso-legal", "privacidad", "cookies"]) {
  const response = await fetch(origin + "/" + slug, { redirect: "manual" });
  check(
    `${slug}: redirección con barra`,
    response.status === 301 &&
      response.headers.get("location") === "/" + slug + "/",
  );
  check(
    `${slug}: index directo`,
    (await fetch(origin + "/" + slug + "/index.html")).status === 200,
  );
}
for (const [path, status] of [
  ["/no-existe/", 404],
  ["/assets/no-existe.js", 404],
  ["/%E0%A4%A", 400],
  ["/..%5cpackage.json", 400],
  ["/%2e%2e%2fpackage.json", 403],
]) {
  check(
    `HTTP ${status} ${path}`,
    (await fetch(origin + path)).status === status,
  );
}
const robots = await (await fetch(origin + "/robots.txt")).text();
check(
  "Rastreo permitido para que el buscador pueda leer noindex",
  /^Allow: \/$/m.test(robots) && !/^Disallow: \/$/m.test(robots),
);
const socialResponse = await fetch(origin + "/assets/og-fgbuzon.png");
const socialImage = Buffer.from(await socialResponse.arrayBuffer());
check(
  "Imagen social PNG de 1200 por 630 disponible",
  socialResponse.status === 200 &&
    socialImage.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) &&
    socialImage.readUInt32BE(16) === 1200 &&
    socialImage.readUInt32BE(20) === 630,
);
check(
  "HEAD sin cuerpo",
  (await (await fetch(origin, { method: "HEAD" })).text()) === "",
);
check(
  "POST no admitido",
  (await fetch(origin, { method: "POST" })).status === 405,
);
check("Sin errores en navegador", report.errors.length === 0);
await writeFile("artifacts/qa-results.json", JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      passed: report.checks.length,
      layouts: report.layouts.length,
      errors: report.errors,
    },
    null,
    2,
  ),
);
