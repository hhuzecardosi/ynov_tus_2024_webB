import {ReceiptPrinter} from "../src/ReceiptPrinter";
import {Receipt} from "../src/model/Receipt";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";

class ReceiptParser{

    constructor(private printedReceipt: string){}

    getTotalPrice() {
        const receiptLines = this.printedReceipt.split('\n')
        return receiptLines[receiptLines.length - 1].split(/ +/)[1];
    }
}

describe('ReceiptPrinter', () => {
    let receiptPrinter: ReceiptPrinter;

    beforeEach(() => {
        receiptPrinter = new ReceiptPrinter();
    });

    it('should work on an empty receipt', () => {
        // ARRANGE
        const receipt = new Receipt();

        // ACT
        const result = receiptPrinter.printReceipt(receipt);

        // ASSERT
        expect(result).toBe('\n' +
            'Total:                              0.00');

        const receiptParser = new ReceiptParser(result);
        expect(receiptParser.getTotalPrice()).toBe('0.00');
    });

    it('should work with one item', () => {
        // ARRANGE
        const receipt = new Receipt();
        receipt.addProduct(new Product('apples', ProductUnit.Kilo), 2, 1.6, 2 * 1.6);

        const result = receiptPrinter.printReceipt(receipt);

        expect(result).toMatchSnapshot();
        // Exactly equal to :
        expect(result).toBe("apples                              3.20\n"+
        "  1.60 * 2.000\n\n"+
        "Total:                              3.20")
    });
});
