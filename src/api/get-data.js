import { objectToArray } from "../helpers/dataConvert";
import { jsonData } from "./fake-data";

export function getData() {
  const data = JSON.parse(localStorage.getItem("daysData"));
  if (data) {
    return objectToArray(data);
  } else {
    localStorage.setItem("daysData", JSON.stringify(jsonData));
    return objectToArray(jsonData);
  }
}
