const root = document.documentElement;
const themeQuery = matchMedia("(prefers-color-scheme: dark)");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const appearanceMenu = document.querySelector(".appearance-menu");
const choices = [...document.querySelectorAll('input[name="appearance"]')];
const labels = { system: "Sistema", light: "Claro", dark: "Oscuro" };
const dropdowns = [
  ...document.querySelectorAll(".appearance-menu, .mobile-navigation"),
];
const animations = new Map();

function finishMotion() {
  animations.forEach((animation) => animation.cancel());
  animations.clear();
}
function applyTheme(preference, save = false) {
  if (!Object.hasOwn(labels, preference)) preference = "system";
  const theme =
    preference === "system"
      ? themeQuery.matches
        ? "dark"
        : "light"
      : preference;
  root.dataset.theme = theme;
  root.dataset.preference = preference;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#0B1410" : "#F6F5F0";
  choices.forEach((choice) => {
    choice.checked = choice.value === preference;
  });
  appearanceMenu
    ?.querySelector("summary")
    ?.setAttribute("aria-label", "Apariencia: " + labels[preference]);
  if (save) {
    try {
      localStorage.setItem("fgbuzon-theme", preference);
    } catch {
      /* The choice still works for this visit. */
    }
  }
}
choices.forEach((choice) =>
  choice.addEventListener("change", () => applyTheme(choice.value, true)),
);
themeQuery.addEventListener("change", () => {
  if (root.dataset.preference === "system") applyTheme("system");
});
window.addEventListener("storage", (event) => {
  if (event.key === "fgbuzon-theme" || event.key === null) {
    root.dataset.input = "keyboard";
    finishMotion();
    applyTheme(event.newValue || "system");
  }
});
applyTheme(root.dataset.preference || "system");
if (appearanceMenu) appearanceMenu.hidden = false;

// Keyboard interaction and programmatic changes never trigger motion.
root.dataset.input = "keyboard";
document.addEventListener(
  "pointerdown",
  () => {
    root.dataset.input = "pointer";
  },
  true,
);
document.addEventListener(
  "pointermove",
  (event) => {
    if (event.pointerType === "mouse" && (event.movementX || event.movementY))
      root.dataset.input = "pointer";
  },
  { passive: true },
);
document.addEventListener(
  "keydown",
  (event) => {
    root.dataset.input = "keyboard";
    finishMotion();
    if (event.key !== "Escape") return;
    const openMenu = dropdowns.find((menu) => menu.open);
    if (openMenu) {
      openMenu.open = false;
      openMenu.querySelector("summary")?.focus();
    }
  },
  true,
);
reducedMotion.addEventListener("change", finishMotion);

dropdowns.forEach((menu) => {
  const summary = menu.querySelector("summary");
  const panel = menu.querySelector("nav, fieldset");
  let pointerOpening = false;
  summary.addEventListener("click", (event) => {
    pointerOpening =
      event.detail > 0 && root.dataset.input === "pointer" && !menu.open;
    if (!menu.open)
      dropdowns.forEach((other) => {
        if (other !== menu) other.open = false;
      });
  });
  menu.addEventListener("toggle", () => {
    animations.get(menu)?.cancel();
    animations.delete(menu);
    if (menu.classList.contains("mobile-navigation")) {
      summary.setAttribute(
        "aria-label",
        menu.open ? "Cerrar menú de navegación" : "Abrir menú de navegación",
      );
    }
    if (
      menu.open &&
      pointerOpening &&
      !reducedMotion.matches &&
      panel?.animate
    ) {
      const animation = panel.animate(
        [
          { opacity: 0, transform: "translateY(-4px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 160, easing: "cubic-bezier(.23, 1, .32, 1)" },
      );
      animations.set(menu, animation);
      animation.addEventListener(
        "finish",
        () => {
          if (animations.get(menu) === animation) animations.delete(menu);
        },
        { once: true },
      );
    }
    pointerOpening = false;
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.open = false;
    }),
  );
});
document.addEventListener("click", (event) => {
  dropdowns.forEach((menu) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
});
document.addEventListener("focusin", (event) => {
  dropdowns.forEach((menu) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
});
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
