const mergeObjects = function (defaultObj, userDefinedObj) {
  const base = {};
  Object.keys(defaultObj).forEach((key) => {
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
  if (!!userDefinedObj && !!userDefinedObj.allowFollowLinks && !!base.rel) {
    delete base.rel;
  }
  return base;
};

module.exports = mergeObjects;
