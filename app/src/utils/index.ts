export const get = (obj: Record<string, any>, path: string, defaultValue: any = undefined) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const first = (obj: any, defaultValue:any = undefined) => {
  if (typeof obj === 'string') return obj?.charAt(0);
  if (Array.isArray(obj) && obj.length > 0) return obj[0];
  return defaultValue;
};
