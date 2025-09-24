export function createArray(N) {
  return [...Array(N).keys()].map((i) => i + 1);
}

export function makeQuery(q, category, sort) {
  let queryParams = '';
  if (q || category || sort) {
    queryParams += '?';

    if (q) {
      queryParams += `query=${q}`;
    }

    if (category && category !== 'all') {
      if (queryParams.length > 1) {
        queryParams += `&category=${category}`;
      } else {
        queryParams += `category=${category}`;
      }
    }

    if (sort) {
      if (queryParams.length > 1) {
        queryParams += `&sort=${sort}`;
      } else {
        queryParams += `sort=${sort}`;
      }
    }
  }
  return queryParams;
}
