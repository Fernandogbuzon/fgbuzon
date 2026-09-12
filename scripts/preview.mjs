import { createServer } from "node:http";
import { readFile, stat, realpath } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { extname, resolve, sep } from "node:path";

const root = await realpath(
  fileURLToPath(new URL("../dist/", import.meta.url)),
);
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

createServer(async (request, response) => {
  const headers = {
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Robots-Tag": "noindex, nofollow",
  };
  const send = (status, type, body) => {
    response.writeHead(status, { ...headers, "Content-Type": type });
    response.end(request.method === "HEAD" ? undefined : body);
  };
  if (!["GET", "HEAD"].includes(request.method)) {
    response.setHeader("Allow", "GET, HEAD");
    send(405, "text/plain; charset=utf-8", "Método no permitido");
    return;
  }
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.includes("\0") || pathname.includes("\\")) {
      send(400, "text/plain; charset=utf-8", "Ruta no válida");
      return;
    }
    const contained = (path) => path === root || path.startsWith(root + sep);
    let file = resolve(root, "." + pathname);
    if (!contained(file)) {
      send(403, "text/plain; charset=utf-8", "Acceso no permitido");
      return;
    }
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith("/")) {
        response
          .writeHead(301, {
            ...headers,
            Location: url.pathname + "/" + url.search,
          })
          .end();
        return;
      }
      file = resolve(file, "index.html");
    }
    if (!contained(await realpath(file))) {
      send(403, "text/plain; charset=utf-8", "Acceso no permitido");
      return;
    }
    const body = await readFile(file);
    send(200, types[extname(file)] || "application/octet-stream", body);
  } catch (error) {
    if (error instanceof URIError || error.code === "ERR_INVALID_URL") {
      send(400, "text/plain; charset=utf-8", "Ruta no válida");
    } else if (["ENOENT", "ENOTDIR", "EISDIR"].includes(error.code)) {
      const page = await readFile(resolve(root, "404.html")).catch(
        () => "Página no encontrada",
      );
      send(404, "text/html; charset=utf-8", page);
    } else {
      send(
        500,
        "text/plain; charset=utf-8",
        "No se ha podido cargar la página",
      );
    }
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Local: http://127.0.0.1:${port}`),
);
