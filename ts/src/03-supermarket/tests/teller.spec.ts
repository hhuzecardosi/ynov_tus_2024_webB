import {FakeCatalog} from "./FakeCatalog";
import {Teller} from "../src/model/Teller";
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
  });

  // TOUJOURS TESTER LE CAS LE PLUS SIMPLE EN PREMIER
  it('should return empty receipt id basket is empty', () => {
    // ACT
    const receipt = teller.checksOutArticlesFrom(shoppingCart);

    // ASSERT
    expect(receipt).toBeInstanceOf(Receipt);
    expect(receipt.getDiscounts()).toEqual([]);
    expect(receipt.getItems()).toEqual([]);
    expect(receipt.getTotalPrice()).toEqual(0);
  });

  it('should return unit price when one unit of the same article', () => {
    // ARRANGE
    const apples = new Product('apples', ProductUnit.Kilo);
    shoppingCart.addItemQuantity(apples, 2);
    catalog.addProduct(apples, 1.80);

    // ACT
    const receipt = teller.checksOutArticlesFrom(shoppingCart);

    // ASSERT
    expect(receipt.getItems()).toHaveLength(1);
    expect(receipt.getItems()[0]).toEqual(new ReceiptItem(apples, 2, 1.80, 1.80*2));
    expect(receipt.getTotalPrice()).toBe(1.80*2);
    expect(receipt.getDiscounts()).toEqual([]);
  });

  // TODO : Ajouter le cas describe when there is one product

  it('should compute the reduction when there is a reduction', () => {
    // ARRANGE
    const apples = new Product('apples', ProductUnit.Kilo);
    shoppingCart.addItemQuantity(apples, 2);
    catalog.addProduct(apples, 1.80);
    teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, apples, 10);

    // ACT
    const receipt = teller.checksOutArticlesFrom(shoppingCart);

    // ASSERT
    expect(receipt.getItems()).toHaveLength(1);
    expect(receipt.getTotalPrice()).toBe((1.80*2)*0.9);
  });

  // Ici on pourrait tester d'autres cas, comme les réductions sur les quantités, les réductions sur les produits, etc.
});
