import { Notification } from "./notification";

describe("Unit test for notifications", () => {
  it("should instantiate notification", () => {
    const notification = new Notification();
    expect(notification).toBeInstanceOf(Notification);
  });

  it("should create errors", () => {
    const notification = new Notification();

    notification.addError({
      message: "error message",
      context: "customer",
    });
    expect(notification.message()).toEqual(["customer: error message"]);

    notification.addError({ message: "error message 2", context: "customer" });
    expect(notification.message()).toEqual([
      "customer: error message",
      "customer: error message 2",
    ]);

    notification.addError({ message: "error message 3", context: "order" });
    expect(notification.message()).toEqual([
      "customer: error message",
      "customer: error message 2",
      "order: error message 3",
    ]);
  });

  it("should filter error with context", () => {
    const notification = new Notification();

    notification.addError({ message: "error message", context: "customer" });
    notification.addError({ message: "error message 2", context: "customer" });
    notification.addError({ message: "error message 3", context: "order" });

    expect(notification.message("customer")).toEqual([
      "customer: error message",
      "customer: error message 2",
    ]);

    expect(notification.message("order")).toEqual(["order: error message 3"]);
  });

  it("should return empty array when context not found", () => {
    const notification = new Notification();
    notification.addError({ message: "error message 3", context: "order" });
    expect(notification.message("fake")).toEqual([]);
  });
});
