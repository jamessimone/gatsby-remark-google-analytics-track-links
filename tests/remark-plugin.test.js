const remarkPlugin = require("../index");
const defaults = require("../defaults");

test("it should work without links present in markdown", () => {
  const markdownAST = {
    type: "emphasis",
    data: {
      hName: "i",
      hProperties: { className: "foo" },
      hChildren: [{ type: "text", value: "bar" }]
    },
    children: [{ type: "text", value: "baz" }]
  };
  const parsedMarkdown = remarkPlugin({ markdownAST }, defaults);
  expect(parsedMarkdown).toEqual(markdownAST);
});

test("it should transform external links properly from markdown", () => {
  const markdownAST = {
    type: "link",
    title: "foo",
    url: "http://foo.com",
    children: [{ type: "text", value: "baz" }]
  };
  const parsedMarkdown = remarkPlugin({ markdownAST }, defaults);
  expect(parsedMarkdown.value).toEqual(
    `<a class="siteLink" href="http://foo.com" title="foo" target="_blank" rel="noopener nofollow noreferrer">baz</a>`
  );
});

test("it should transform internal links properly from markdown", () => {
  const markdownAST = {
    type: "link",
    title: "foo",
    url: "/foo",
    children: [{ type: "text", value: "baz" }]
  };
  const parsedMarkdown = remarkPlugin({ markdownAST }, defaults);
  expect(parsedMarkdown.value).toEqual(
    `<a class="siteLink" href="/foo" title="foo">baz</a>`
  );
});

test("it should use fallback title if title is not present", () => {
  const markdownAST = {
    type: "link",
    url: "/foo",
    children: [{ type: "text", value: "baz" }]
  };
  const parsedMarkdown = remarkPlugin({ markdownAST }, defaults);
  expect(parsedMarkdown.value).toEqual(
    `<a class="siteLink" href="/foo" title="baz">baz</a>`
  );
});

// [**baz**](/foo)
test("it should transform links properly from markdown containing inline content in link text", () => {
  const markdownAST = {
    type: "link",
    title: null,
    url: "/foo",
    children: [{
      type: "strong",
      children: [{ type: "text", value: "baz" }]
    }]
  };
  const parsedMarkdown = remarkPlugin({ markdownAST }, defaults);
  expect(parsedMarkdown.value).toEqual(
    `<a class="siteLink" href="/foo" title="baz">baz</a>`
  );
});
