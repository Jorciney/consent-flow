export const toQueryString = (params: Object): string =>
  new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, value.toString()])
  ).toString();

export const getQueryParams = (url: string): { [key: string]: string } => {
  return (
    url
      .split('?')[1]
      ?.split('&')
      .reduce((acc: Record<string, string>, pair: string) => {
        const [key, value] = pair.split('=');
        acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
        return acc;
      }, {}) || {}
  );
};
