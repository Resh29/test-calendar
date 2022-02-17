export const objectToArray = (object) => {
  return Object.keys(object).map((key) => {
    return { day: key, hours: object[key] };
  });
};

// 1439
export const createRow = () => {
  const arr = [];
  let range = 0;
  for (let i = 0; i < 24; i++) {
    const obj = { bt: range, et: range + 60 };
    range += 60;
    arr.push(obj);
  }
  return arr;
};
