import defaults from "./defaults";
import isLocalLink from "./is-local-link";
import mergeObjects from "./merge-objects";

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

export function onRouteUpdate({ location, prevLocation }, pluginOptions) {
  const options = mergeObjects(defaults, pluginOptions);
  const initialRender = !!location && !prevLocation;
  const routeHasChanged =
    !!prevLocation && location.pathname !== prevLocation.pathname;

  if (initialRender || routeHasChanged) {
    addOnClick(options);
  }

  return null;
}
