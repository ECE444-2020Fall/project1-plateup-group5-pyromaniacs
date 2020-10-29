export function constructQueryParams(params, keyTransforms) {
  let queryParams = "";

  for (const param in params) {
    if (params[param]) {
      let key = keyTransforms[param] ? keyTransforms[param] : param
      queryParams = appendQueryParam(queryParams, `${key}=${params[param]}`);
    }
  }

  return queryParams;
}

function appendQueryParam(existingQueryParams, newParam) {
  if (existingQueryParams) {
    existingQueryParams += (`&${newParam}`);
  } else {
    existingQueryParams = (`?${newParam}`);
  }

  return existingQueryParams;
}
