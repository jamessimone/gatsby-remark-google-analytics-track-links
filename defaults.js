module.exports = {
  allowFollowLinks: false,
  className: "siteLink",
  localLinkMatch: false,
  gaOptions: {
    internalLinkTitle: "Internal Link",
    externalLinkTitle: "External Link",
    eventCategory: false,
    eventAction: `click`,
    eventLabel: false,
  },
  rel: "noopener nofollow noreferrer",
  runInDev: false,
  target: "_blank",
};
