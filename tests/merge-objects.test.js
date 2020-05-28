const mergeObjects = require("../merge-objects");

const pluginDefaults = require("../defaults");

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

test("it should use default property when user preference not passed", () => {
  const merged = mergeObjects({ test: false }, { otherProp: true });
  expect(merged.test).toEqual(false);
});

test("it should not append follow attribute when using special config value", () => {
  const merged = mergeObjects(pluginDefaults, { allowFollowLinks: true });
  expect(merged.rel).toBeFalsy();
});
