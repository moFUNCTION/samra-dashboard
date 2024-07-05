function isObject(obj) {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (!isObject(obj1) || !isObject(obj2)) return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (
      !Object.prototype.hasOwnProperty.call(obj2, key) ||
      !deepEqual(obj1[key], obj2[key])
    ) {
      return false;
    }
  }
  return true;
}

export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item, index) => deepEqual(item, arr2[index]));
}
