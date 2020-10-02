const defaults = require("./defaults");
const isLocalLink = require("./is-local-link");
const mergeObjects = require("./merge-objects");

const getGoogleEventArgs = (options, event) => {
  const { gaOptions } = options;
  const isLocal = isLocalLink(event.currentTarget.href, options.localLinkMatch);
  const fallbackCategory = isLocal
    ? gaOptions.internalLinkTitle
    : gaOptions.externalLinkTitle;
  return {
    eventCategory: !!gaOptions.eventCategory
      ? gaOptions.eventCategory
      : fallbackCategory,
    eventAction: gaOptions.eventAction,
    eventLabel: !!gaOptions.eventLabel
      ? gaOptions.eventLabel
      : event.currentTarget.href,
  };
};

const sendToGaTag = (options, event) => {
  if (!window.ga) {
    return;
  }
  const args = getGoogleEventArgs(options, event);
  window.ga("send", "event", args);
};
const sendToGtag = (options, event) => {
  if (!window.gtag) {
    return;
  }
  const originalArgs = getGoogleEventArgs(options, event);
  const args = {
    event_category: originalArgs.eventCategory,
    event_action: originalArgs.eventAction,
    event_label: originalArgs.eventLabel,
  };
  window.gtag("event", args.event_category, args);
};

const shouldRun = (options) =>
  process.env.NODE_ENV === "production" || options.runInDev;

const onClick = (event, options) => {
  if (shouldRun(options)) {
    sendToGaTag(options, event);
    sendToGtag(options, event);
  }
};

const addOnClick = (options) => {
  const elements = document.getElementsByClassName(options.className);
  const elemList = Array.from(elements);
  for (let index = 0; index < elemList.length; index++) {
    const anchorElement = elemList[index];
    anchorElement.onclick = function (event) {
      onClick(event, options);
    };
  }
};

module.exports = {
  onRouteUpdate({ location, prevLocation }, pluginOptions) {
    const options = mergeObjects(defaults, pluginOptions);

    addOnClick(options);

    return null;
  },
};
