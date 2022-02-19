export const isInRange = (target, arr) => {
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      if (target.bt >= arr[i].bt && target.et <= arr[i].et) {
        return true;
      } else {
        continue;
      }
    }
  } else {
    return false;
  }
};
