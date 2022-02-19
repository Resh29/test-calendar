export const objectToArray = (object) => {
  return Object.keys(object).map((key) => {
    return { day: key, hours: object[key] };
  });
};

export const createRow = () => {
  const arr = [];
  let range = 0;
  const step = 60;
  for (let i = 0; i < 24; i++) {
    const obj = { bt: range, et: range + step - 1 };
    range += 60;
    arr.push(obj);
  }
  return arr;
};

export function createSlices(arr) {
  const result = [];
  arr.sort((a, b) => a.bt - b.bt);
  for (let item of arr) {
    if (result.length) {
      // eslint-disable-next-line no-unused-vars
      for (let _ of result) {
        const isExist = result.find((i) => i.et === item.bt - 1);
        if (isExist) {
          isExist.et = item.et;
          break;
        } else {
          result.push(item);
          break;
        }
      }
    } else {
      result.push(item);
    }
  }
  return result;
}
