import {FakeCatalog} from "./FakeCatalog";
import {Teller} from "../src/model/Teller";
import {ShoppingCart} from "../src/model/ShoppingCart";
import {Receipt} from "../src/model/Receipt";


describe('Teller', () => {

  // TOUJOURS TESTER LE CAS LE PLUS SIMPLE EN PREMIER
  it('should return empty receipt id basket is empty', () => {

    // ARRANGE
    const catalog = new FakeCatalog();
    const teller = new Teller(catalog);
    const shoppingCart = new ShoppingCart();

    // ACT
    const receipt = teller.checksOutArticlesFrom(shoppingCart);

    // ASSERT
    expect(receipt).toBeInstanceOf(Receipt);
    expect(receipt.getDiscounts()).toEqual([]);
    expect(receipt.getItems()).toEqual([]);
    expect(receipt.getTotalPrice()).toEqual(0);
  });

});
