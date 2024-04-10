export function objToString (obj: any) {
  return Object.entries(obj).reduce((str, [p, val]) => {
    return `${str}${p}: ${val}\n`;
  }, '');
};