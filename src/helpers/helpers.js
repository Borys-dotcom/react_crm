export const setNestedKey = (obj, path, value) => {
    if (path.length === 1) {
      obj[path] = value;
      return;
    } else {
      return setNestedKey(obj[path[0]], path.slice(1), value);
    }
  };