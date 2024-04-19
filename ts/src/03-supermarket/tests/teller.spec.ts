import {Teller} from "../src/model/Teller";
import {FakeCatalog} from "./FakeCatalog";
import {ShoppingCart} from "../src/model/ShoppingCart";
import {Receipt} from "../src/model/Receipt";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";
import {ReceiptItem} from "../src/model/ReceiptItem";
import {SpecialOfferType} from "../src/model/SpecialOfferType";

describe('Teller', () => {
    let catalog: FakeCatalog;
    let teller: Teller;
    let shoppingCart: ShoppingCart;

    beforeEach(() => {
        catalog = new FakeCatalog();
        teller = new Teller(catalog);
        shoppingCart = new ShoppingCart();
    })

    it('should return empty receipt if basket is empty', () => {
        // ACT
        const receipt = teller.checksOutArticlesFrom(shoppingCart);

        // ASSERT
        expect(receipt).toBeInstanceOf(Receipt);
        expect(receipt.getDiscounts()).toEqual([]);
        expect(receipt.getItems()).toEqual([]);
        expect(receipt.getTotalPrice()).toBe(0);
    });

    it('should return unit price when one unit of same article', () => {
        // ARRANGE
        const apples = new Product('apples', ProductUnit.Kilo);
        shoppingCart.addItemQuantity(apples, 2);
        catalog.addProduct(apples, 1.8);

        // AGE
        const receipt = teller.checksOutArticlesFrom(shoppingCart);

        expect(receipt.getItems()).toHaveLength(1);
        expect(receipt.getItems()[0]).toEqual(new ReceiptItem(apples, 2, 1.8, 2 * 1.8));
        expect(receipt.getTotalPrice()).toBe(2 * 1.8);
        expect(receipt.getDiscounts()).toEqual([]);
    });

    describe('when there is only one product in basket (SAME AS TEST ABOVE)', () => {
        let receipt: Receipt;
        let apples: Product;
        beforeEach(() => {
            // ARRANGE
            apples = new Product('apples', ProductUnit.Kilo);
            shoppingCart.addItemQuantity(apples, 2);
            catalog.addProduct(apples, 1.8);

            // ACT
            receipt = teller.checksOutArticlesFrom(shoppingCart);
        })

        it('should return one item', () => {
            expect(receipt.getItems()).toHaveLength(1);
            expect(receipt.getItems()[0]).toEqual(new ReceiptItem(apples, 2, 1.8, 2 * 1.8));
        });

        it('should compute total price correctly', () => {
            expect(receipt.getTotalPrice()).toBe(2 * 1.8);
        });

        it(' should display no discount', () => {
            expect(receipt.getDiscounts()).toEqual([]);
        })
    });

    it('should compute the reduction when there is a discount', () => {
        // ARRANGE
        const apples = new Product('apples', ProductUnit.Kilo);
        const applesQuantity = 2;
        const applesPrice = 1.8;
        shoppingCart.addItemQuantity(apples, applesQuantity);
        catalog.addProduct(apples, applesPrice);
        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, apples, 10);

        // ACT
        const receipt = teller.checksOutArticlesFrom(shoppingCart);

        // ASSERT
        expect(receipt.getTotalPrice()).toBe((applesQuantity * applesPrice) * 0.9);
    });

});
