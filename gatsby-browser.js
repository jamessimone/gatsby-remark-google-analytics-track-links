const defaults = require("./defaults");
const isLocalLink = require("./is-local-link");
const mergeObjects = require("./merge-objects");

const shouldRun = options =>
  typeof window !== "undefined" &&
  !!window.ga &&
  (process.env.NODE_ENV === "production" || options.runInDev);

const onClick = (event, options) => {
  const { gaOptions } = options;
  const isLocal = isLocalLink(event.currentTarget.href, options.localLinkMatch);
  const fallbackCategory = isLocal
    ? gaOptions.internalLinkTitle
    : gaOptions.externalLinkTitle;
  if (shouldRun(options)) {
    window.ga(`send`, `event`, {
      eventCategory: !!gaOptions.eventCategory
        ? gaOptions.eventCategory
        : fallbackCategory,
      eventAction: gaOptions.eventAction,
      eventLabel: !!gaOptions.eventLabel
        ? gaOptions.eventLabel
        : event.currentTarget.href
    });
  }
};

const addOnClick = options => {
  const elements = document.getElementsByClassName(options.className);
  const elemList = Array.from(elements);
  for (let index = 0; index < elemList.length; index++) {
    const anchorElement = elemList[index];
    anchorElement.onclick = function(event) {
      onClick(event, options);
    };
  }
};

module.exports = {
  onRouteUpdate({ location, prevLocation }, pluginOptions) {
    const options = mergeObjects(defaults, pluginOptions);

    addOnClick(options);

    return null;
  }
};
