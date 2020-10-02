const defaults = require("../defaults");
const { onRouteUpdate } = require("../gatsby-browser");

const mockAnchor = { class: "mock" };

const getElementsByClassNameMock = () => {
  return [mockAnchor];
};

const spyFunction = jest.fn();

beforeAll(() => {
  mockAnchor.onclick = null;
  Object.defineProperty(global.document, "getElementsByClassName", {
    value: getElementsByClassNameMock,
  });
  Object.defineProperties(global.window, {
    ga: { value: spyFunction, writable: true },
    gtag: { value: spyFunction, writable: true },
  });
});

beforeEach(() => {
  spyFunction.mockClear();
});

test("it should add onclick handler to returned elements on initial render", () => {
  onRouteUpdate(
    { location: { pathname: "hi" } },
    { className: mockAnchor.class }
  );

  expect(mockAnchor.onclick).toBeTruthy();
});

test("it should add onclick handler to returned elements on render with different pathname", () => {
  onRouteUpdate(
    { location: { pathname: "hi" }, prevLocation: { pathname: "hello" } },
    { className: mockAnchor.class }
  );

  expect(mockAnchor.onclick).toBeTruthy();
});

test("it should add onclick handler when reloading page without change in navigation", () => {
  onRouteUpdate(
    { location: { pathname: "hi" }, prevLocation: { pathname: "hi" } },
    { className: mockAnchor.class }
  );

  expect(mockAnchor.onclick).toBeTruthy();
});

test("on click should send event to ga for internal links", () => {
  onRouteUpdate(
    { location: { pathname: "hi" } },
    { className: mockAnchor.class, runInDev: true }
  );

  const mockClickEvent = { currentTarget: { href: "/hi" } };
  mockAnchor.onclick(mockClickEvent);

  expect(spyFunction).toBeCalled();
  expect(spyFunction.mock.calls[0]).toEqual([
    "send",
    "event",
    {
      eventCategory: defaults.gaOptions.internalLinkTitle,
      eventAction: defaults.gaOptions.eventAction,
      eventLabel: mockClickEvent.currentTarget.href,
    },
  ]);
});

test("on click should send event to ga for external links", () => {
  onRouteUpdate(
    { location: { pathname: "hi" } },
    { className: mockAnchor.class, runInDev: true }
  );

  const mockClickEvent = { currentTarget: { href: "https://hi.com" } };
  mockAnchor.onclick(mockClickEvent);

  expect(spyFunction).toBeCalled();
  expect(spyFunction.mock.calls[0]).toEqual([
    "send",
    "event",
    {
      eventCategory: defaults.gaOptions.externalLinkTitle,
      eventAction: defaults.gaOptions.eventAction,
      eventLabel: mockClickEvent.currentTarget.href,
    },
  ]);
});

test("on click should send events to ga for internal links with full url when they match options", () => {
  onRouteUpdate(
    { location: { pathname: "hi" } },
    { className: mockAnchor.class, runInDev: true, localLinkMatch: "hi.com" }
  );

  const mockClickEvent = { currentTarget: { href: "https://hi.com" } };
  mockAnchor.onclick(mockClickEvent);

  expect(spyFunction).toBeCalled();
  expect(spyFunction.mock.calls[0]).toEqual([
    "send",
    "event",
    {
      eventCategory: defaults.gaOptions.internalLinkTitle,
      eventAction: defaults.gaOptions.eventAction,
      eventLabel: mockClickEvent.currentTarget.href,
    },
  ]);
});

test("it should send events to gtag if gtag exists", () => {
  onRouteUpdate(
    { location: { pathname: "hi" } },
    { className: mockAnchor.class, runInDev: true }
  );

  const mockClickEvent = { currentTarget: { href: "/hi" } };
  mockAnchor.onclick(mockClickEvent);

  expect(spyFunction).toHaveBeenCalledTimes(2);
  expect(spyFunction.mock.calls[1]).toEqual([
    "event",
    "Internal Link",
    {
      event_category: defaults.gaOptions.internalLinkTitle,
      event_action: defaults.gaOptions.eventAction,
      event_label: mockClickEvent.currentTarget.href,
    },
  ]);
});
