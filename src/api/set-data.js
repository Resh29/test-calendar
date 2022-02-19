export function setData(data, itemName = "daysData") {
  const stringifyData = JSON.stringify(data);
  console.log(stringifyData);
  localStorage.setItem(itemName, stringifyData);
}
