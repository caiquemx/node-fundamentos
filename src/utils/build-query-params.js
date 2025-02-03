export function buildQueryParams(url) {
  const rawParams = url.split('?');
  if (!rawParams[1] || rawParams[1].length <= 0) {
    return;
  }

  const paramsArray = rawParams[1].split('&');
  // return paramsArray;
  // return rawParams;
  const queryParams = paramsArray.reduce((acc, curr) => {
    const params = curr.split('=');
    acc[params[0]] = params[1];
    return acc;
  }, {});
  return queryParams;
}
