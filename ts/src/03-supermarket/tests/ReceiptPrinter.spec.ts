import {ReceiptPrinter} from "../src/ReceiptPrinter";

describe("ReceiptPrinter", () => {

  let printer: ReceiptPrinter;

  beforeAll(() => {
    printer = new ReceiptPrinter();
  });

  it("should return the total amount of the basket", () => {
    // Arrange
    const receipt = {
      totalPrice: 1.99
    };

    // Act
    const printedReceipt = printer.printReceipt(receipt);

    // Assert
    expect(printedReceipt).toBe("Total: 1.99");
  });

  it("should return the total amount of the basket with a discount", () => {
    // Arrange
    const receipt = {
      totalPrice: 1.99,
      discount: 0.2
    };

    // Act
    const printedReceipt = printer.printReceipt(receipt);

    // Assert
    expect(printedReceipt).toBe("Total: 1.99 (discount: 0.2)");
  });

  it("should return the total amount of the basket with a discount and a special offer", () => {
    // Arrange
    const receipt = {
      totalPrice: 1.99,
      discount: 0.2,
      specialOffer: "Buy 2 get 1 free"
    };

    // Act
    const printedReceipt = printer.printReceipt(receipt);

    // Assert
    expect(printedReceipt).toBe("Total: 1.99 (discount: 0.2) Special offer: Buy 2 get 1 free");
  });
});
