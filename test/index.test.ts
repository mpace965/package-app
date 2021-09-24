import { getMessage } from "../src/index";

it("returns the message", () => {
  expect(getMessage()).toBe("hello there");
});
