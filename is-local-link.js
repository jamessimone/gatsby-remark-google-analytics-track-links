module.exports = function(href, localLinkMatch) {
  let shouldContinue = true;
  if (localLinkMatch) {
    const internalMatch = href.match(localLinkMatch);
    if (!!internalMatch) {
      shouldContinue = false;
      return true;
    }
  }
  if (shouldContinue && !href.match(/http(s|.*)/)) {
    return true;
  }

  return false;
};
