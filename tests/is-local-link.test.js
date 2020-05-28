const isLocalLink = require("../is-local-link");

test("it should detect external link from http", () => {
  const notLocal = isLocalLink("http://google.com");
  expect(notLocal).toEqual(false);
});

test("it should detect external link from https", () => {
  const notLocal = isLocalLink("https://google.com");
  expect(notLocal).toEqual(false);
});

test("it should detect relative internal link", () => {
  const local = isLocalLink("/my-url");
  expect(local).toEqual(true);
});

test("it should detect absolute internal link with local link match", () => {
  const local = isLocalLink("https://www.my-url.com/my-url", "www.my-url.com");
  expect(local).toEqual(true);
});

test("match should not blow up on null href", () => {
  const local = isLocalLink(null);
  expect(local).toEqual(false);
});
