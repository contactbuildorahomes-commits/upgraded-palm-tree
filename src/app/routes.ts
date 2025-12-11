import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { index, route, type RouteConfigEntry } from "@react-router/dev/routes";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function buildRoutes(baseDir: string, basePath = ""): RouteConfigEntry[] {
  const files = readdirSync(baseDir);
  const routes: RouteConfigEntry[] = [];

  for (const file of files) {
    const fullPath = join(baseDir, file);
    const isDir = statSync(fullPath).isDirectory();

    // FOLDER
    if (isDir) {
      routes.push(...buildRoutes(fullPath, `${basePath}/${file}`));
      continue;
    }

    // PAGE FILE
    if (file === "page.jsx") {
      const componentPath =
        basePath === ""
          ? `./page.jsx`
          : `.${basePath}/page.jsx`;

      // ROOT PAGE → index route
      if (basePath === "") {
        routes.push(index(componentPath));
        continue;
      }

      // Convert folder names like [id] → :id
      const pathSegments = basePath
        .split("/")
        .filter(Boolean)
        .map((segment) => {
          if (segment.startsWith("[") && segment.endsWith("]")) {
            return `:${segment.slice(1, -1)}`;
          }
          return segment;
        });

      const routePath = pathSegments.join("/");
      routes.push(route(routePath, componentPath));
    }
  }

  return routes;
}

// Auto-import pages in dev mode
if (import.meta.env.DEV) {
  import.meta.glob("./**/page.jsx");

  if (import.meta.hot) {
    import.meta.hot.accept();
  }
}

// Build all routes
const routes = buildRoutes(__dirname);

// Add a clean 404 fallback — MUST be unique file
routes.push(route("*", "./not-found.jsx"));

export default routes;
