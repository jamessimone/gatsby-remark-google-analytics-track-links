# Gatsby Remark Google Analytics Track Links

[![npm](https://img.shields.io/npm/v/gatsby-remark-google-analytics-track-links/latest.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-remark-google-analytics-track-links)

This is a Gatsby Remark plugin that provides the same tracking that `gatsby-plugin-google-analytics`'s `OutboundLink` and `trackCustomEvent` accomplishes within your actual codebase: the ability to track link clicks to internal & external locations within your markdown. It provides an `onClick` handler to all links that come from Markdown in your site.

## Installation

With npm:

`npm install --save gatsby-remark-google-analytics-track-links`

or with yarn:

`yarn add gatsby-remark-google-analytics-track-links`

## Example config

```javascript
// In gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        //...
        `gatsby-remark-google-analytics-track-links`,
      ],
    },
  },
];
```

## Plugin Options

This plugin adds `target="_blank" rel="noopener nofollow noreferrer"` properties by default to your external links, as well as a targetable class name (`"siteLink"` by default). Here are all the defaults:

```javascript
{
  className: "siteLink",
  localLinkMatch: false, //otherwise should be a string / regex
  gaOptions: {
    internalLinkTitle: "Internal Link", //fallback for internal links if event category not passed
    externalLinkTitle: "External Link", //fallback for external links if event category not passed
    eventCategory: false, //pass a string to customize
    eventAction: `click`,
    eventLabel: false //pass a string to customize
  },
  rel: "noopener nofollow noreferrer", //added to each anchor tag
  runInDev: false, //update to true if your version of GA is available in dev and you want to test tracking
  target: "_blank" // added to each anchor tag
}
```

You can customize any of the options you would like; the others will be copied from the defaults:

```javascript
// In gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        //...
        {
          resolve: "gatsby-remark-google-analytics-track-links",
          options: {
            target: "someValue",
            rel: "noopener noreferrer",
            className: "theClassIdLikeInstead",
          },
        },
      ],
    },
  },
];
```

### Options in depth

- `className`: the class added to each anchor tag
- `localLinkMatch`: string or regex if you need additional matching options for catching internal links; I think most people end up using a combination of `gatsby-remark-relative-links` and `gatsby-plugin-catch-links`, but if you needed to catch "absolute-path-y" links in your Markdown that are in fact local links, then this option will let you properly flag the links as internal ones for your GA events
- `gaOptions.internalLinkTitle`: if you aren't going to use your own custom event category this is the category that will be used for internal links
- `gaOptions.externalLinkTitle`: same but for external links
- `gaOptions.eventCategory`: supply this string to override the choices for internal / external link titles
- `gaOptions.eventAction`: "click" by default, or your own string
- `gaOptions.eventLabel`: if you don't supply your own string, defaults to `event.currentTarget.href`; the URL of the link that was clicked, in other words
- `rel`: defines the relationship from the current page to the linked page. Defaults to `noopener nofollow noreferrer` for external links; is not added to internal links
- `runInDev`: by default, this plugin does not run while in Dev mode; this mirrors the settings for `gatsby-plugin-google-analytics`. If you are installing the GA tag on your own and want to test event sending in development, you can set this flag to `true` to test. Otherwise, you can test by running `gatsby build` and then `gatsby serve`
- `target`: where to open the link. Defaults to `_blank` for external links; is not added for internal links

## Contributions

Contributions are welcome, however I would ask that all feature requests come with additional tests added. You are also welcome to contribute in the way of adding tests, though heavy test refactors may be turned away unless there is a pressing need for said refactor. Additionally, I would ask that all PR's be submitted with the default `prettier` formatting.

Thanks to:

- [Gabriel Cutrini](/https://github.com/gcutrini) for contributing to 0.0.6 by [fixing links with inline content](https://github.com/jamessimone/gatsby-remark-google-analytics-track-links/pull/4/files)!
