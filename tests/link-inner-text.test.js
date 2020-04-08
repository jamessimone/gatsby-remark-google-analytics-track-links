const linkInnerText = require("../link-inner-text");

// [link *foo **bar** `#`*](/uri)
test("it should flatten link content as text", () => {
  const node = {
    type: "link",
    title: null,
    url: "/uri",
    children: [
      { type: "text", value: "link *foo " },
      { type: "strong", children: [{ type: "text", value: "bar" }] },
      { type: "text", value: " " },
      { type: "inlineCode", value: "#" },
      { type: "text", value: "*" },
    ],
  };
  expect(linkInnerText(node)).toEqual("link *foo bar #*");
});
