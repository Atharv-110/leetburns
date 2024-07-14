import path from "path";

// Function to clean up the regex path
const getPathFromRegex = (regexp) => {
  return regexp
    .toString()
    .replace("/^", "")
    .replace("?(?=\\/|$)/i", "")
    .replace(/\\\//g, "/")
    .replace("(?:/(?=$))", "");
};

// Function to combine stack routes
const combineStacks = (acc, stack) => {
  if (stack.handle && stack.handle.stack) {
    const routerPath = getPathFromRegex(stack.regexp);
    return [
      ...acc,
      ...stack.handle.stack.map((stack) => ({ routerPath, ...stack })),
    ];
  }
  return [...acc, stack];
};

// Function to get stacks from app
const getStacks = (app) => {
  if (app._router && app._router.stack) {
    return app._router.stack.reduce(combineStacks, []);
  }

  return [];
};

// Function to list routes
export const expressListRoutes = (app, opts) => {
  const stacks = getStacks(app);
  const options = { prefix: "", ...opts };
  const paths = [];

  if (stacks) {
    for (const stack of stacks) {
      if (stack.route) {
        const routeLogged = {};
        for (const route of stack.route.stack) {
          const method = route.method ? route.method.toUpperCase() : null;
          if (!routeLogged[method] && method) {
            const stackPath = path
              .normalize(
                [options.prefix, stack.routerPath, stack.route.path, route.path]
                  .filter((s) => !!s)
                  .join("")
              )
              .trim();

            paths.push({ method, path: stackPath });
            routeLogged[method] = true;
          }
        }
      }
    }
  }

  return paths;
};

// Function to get all routes
export const allRoutes = (app) =>
  expressListRoutes(app)
    .map((x) => {
      return {
        method: x.method,
        path: x.path.replace(/\\/g, "/"),
      };
    })
    .filter((x) => x.path != "(.*)/");

export default expressListRoutes;
