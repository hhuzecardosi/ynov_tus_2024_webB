import {ReceiptPrinter} from "../src/ReceiptPrinter";
import {Receipt} from "../src/model/Receipt";
import {ProductUnit} from "../src/model/ProductUnit";
import {Product} from "../src/model/Product";

// CREATE HELPERS TO PARSE THE RECEIPT
class ReceiptParser {

  private printedReceipt: string;
  constructor(printedReceipt: string) {
    this.printedReceipt = printedReceipt;
  }

  getTotalPrice(): string {
    const receiptLines = this.printedReceipt.split('\n');
    return receiptLines[receiptLines.length - 1].split(/ +/)[1];
  }

}

describe('ReceiptPrinter', () => {
  let receiptPrinter: ReceiptPrinter;

  beforeEach(() => {
    receiptPrinter = new ReceiptPrinter();
  });

  it('should work on an empty receipt', () => {
    //ARRANGE
    const receipt = new Receipt();

    //ACT
    const printedReceipt = receiptPrinter.printReceipt(receipt);

    //ASSERT
    const receiptParser = new ReceiptParser(printedReceipt);
    expect(receiptParser.getTotalPrice()).toEqual('0.00');
  });

  it ('should work with one item', () => {
    // ARRANGE
    const receipt = new Receipt();
    receipt.addProduct(new Product('apples', ProductUnit.Kilo), 2, 1.80, 1.80*2);

    // ACT
    const result = receiptPrinter.printReceipt(receipt);

    // ASSERT
    // snapshot testing --> create a snapshot of the result to verify manually for the first time and then compare
    // the result with the snapshot in the future --> COMMIT THE SNAPSHOT
    expect(result).toMatchSnapshot();

    // SAME AS
    expect(result).toBe("apples                              3.60\n" +
    "  1.80 * 2.000\n\n" +
    "Total:                              3.60");
  });

});
