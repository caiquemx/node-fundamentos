export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-z]+)/g;
  const replacedParams = path.replaceAll(routeParamsRegex, '(?<$1>[a-z0-9-_]+)');

  const pathRegex = new RegExp(`^${replacedParams}`);

  return pathRegex;
}
