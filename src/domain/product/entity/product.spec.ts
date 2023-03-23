import { NotificationError } from "../../@shared/notification/notification.error";
import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError(new NotificationError("product: Id is required"));
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError(new NotificationError("product: Name is required"));
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrowError(
      new NotificationError("product: Price must be greater than zero")
    );
  });

  it("should throw error when price, name and id is invalid", () => {
    expect(() => {
      new Product("", "", -1);
    }).toThrowError(
      new NotificationError(
        "product: Id is required, product: Name is required, product: Price must be greater than zero"
      )
    );
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
