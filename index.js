const visit = require("unist-util-visit");

const defaults = require("./defaults");
const isLocalLink = require("./is-local-link");
const mergeObjects = require("./merge-objects");
const linkInnerText = require("./link-inner-text");

const tagAnchorWithClassName = (node, options) => {
  const { url, title, children } = node;

  const innerText = linkInnerText(node);
  const titleAttribute = !!title ? title : innerText;

  const shouldAddTargetAndRel = !isLocalLink(url, options.localLinkMatch);

  const startElement = `<a class="${options.className}" href="${url}" title="${titleAttribute}"`;
  const targetAndRel = shouldAddTargetAndRel
    ? ` target="${options.target}" rel="${options.rel}"`
    : "";
  const endElement = `>${innerText}</a>`;
  const anchorElement = startElement + targetAndRel + endElement;

  return anchorElement;
};

module.exports = ({ markdownAST }, pluginOptions) => {
  const linkNodes = [];

  visit(markdownAST, ["link", "linkReference"], linkNode => {
    linkNodes.push(linkNode);
  });

  const options = mergeObjects(defaults, pluginOptions);
  for (var index = 0; index < linkNodes.length; index++) {
    const node = linkNodes[index];
    const html = tagAnchorWithClassName(node, options);

    node.value = html;
    node.type = "html";
    node.children = undefined;
  }

  return markdownAST;
};
