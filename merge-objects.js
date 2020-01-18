const mergeObjects = function(defaultObj, userDefinedObj) {
  const base = {};
  Object.keys(defaultObj).forEach(key => {
    const potentiallyDefinedProp = !!userDefinedObj && userDefinedObj[key];
    if (
      !!potentiallyDefinedProp &&
      typeof potentiallyDefinedProp === "object"
    ) {
      base[key] = mergeObjects(potentiallyDefinedProp);
    } else if (!!potentiallyDefinedProp) {
      base[key] = potentiallyDefinedProp;
    } else {
      base[key] = defaultObj[key];
    }
  });
  return base;
};

module.exports = mergeObjects;
