export interface agruparArrInterface {
  keys: string[];
  values: any[];
  single: any;
  keysAndValue: any[];
}

const agruparArr = (
  arr: any[],
  callback: (elemen: any) => string | number,
  options?: any
): agruparArrInterface => {
  const { groupd, forceEqual } = options || {};
  const group = groupd ? { ...groupd } : {};
  arr.forEach((el) => {
    const property = forceEqual
      ? String(callback(el)).toLowerCase()
      : callback(el);
    if (group.hasOwnProperty(property)) {
      group[property].push(el);
    } else {
      group[property] = [el];
    }
  });

  return {
    keys: Object.keys(group),
    values: Object.values(group),
    single: group,
    keysAndValue: Object.keys(group).map((k) => ({ key: k, value: group[k] })),
  } as const;
};
export default agruparArr;
