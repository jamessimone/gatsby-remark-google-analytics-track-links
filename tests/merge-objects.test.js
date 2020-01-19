const mergeObjects = require("../merge-objects");

test("it should accept undefined user preferences", () => {
  const merged = mergeObjects({}, undefined);
  expect(merged).toEqual({});
});

test("it should merge objects with defaults", () => {
  const merged = mergeObjects({ test: { a: false } }, { test: { a: true } });
  expect(merged.test.a).toEqual(true);
});

test("it should merge regular properties with defaults", () => {
  const merged = mergeObjects({ test: false }, { test: true });
  expect(merged.test).toEqual(true);
});

test("it should use defualt property when user preference not passed", () => {
  const merged = mergeObjects({ test: false }, { otherProp: true });
  expect(merged.test).toEqual(false);
});
