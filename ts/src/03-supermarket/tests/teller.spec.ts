import {Teller} from "../src/model/Teller";
import {FakeCatalog} from "./FakeCatalog";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";
import {ShoppingCart} from "../src/model/ShoppingCart";
import {SpecialOfferType} from "../src/model/SpecialOfferType";


describe("teller", () => {

  let teller: Teller;
  let catalog: FakeCatalog;

  let p1: Product, p2: Product, p3: Product, p4: Product;

  let shoppingCart: ShoppingCart;

  beforeAll(() => {
    p1 = new Product("Banana", ProductUnit.Kilo);
    p2 = new Product("Apple", ProductUnit.Kilo);
    p3 = new Product("Orange", ProductUnit.Kilo);
    p4 = new Product("Pineapple", ProductUnit.Each);
  });

  beforeEach(() => {
    catalog = new FakeCatalog();
    catalog.addProduct(p1, 2);
    catalog.addProduct(p2, 1.99);
    catalog.addProduct(p3, 3);
    catalog.addProduct(p4, 4.5);
    teller = new Teller(catalog);
    shoppingCart = new ShoppingCart();
  });

  it("should return the total amount of the basket", () => {
    // Arrange
    shoppingCart.addItemQuantity(p1, 1);
    shoppingCart.addItemQuantity(p2, 2);

    // 1 banana + 2 apples
    const expectedTotal = 2 + 1.99 * 2;

    // Act
    const receipt = teller.checksOutArticlesFrom(shoppingCart);

    // Assert
    expect(receipt.getTotalPrice()).toBe(expectedTotal);
  });

  it("should return the total amount of the basket with a discount", () => {
    // Arrange
    shoppingCart.addItemQuantity(p1, 1);
    shoppingCart.addItemQuantity(p2, 2);
    teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, p2, 10);

    // 1 banana + 2 apples with 10% discount
    const expectedTotal = 2 + 1.99 * 2 - (1.99 * 2 * 10 / 100);
    // Act

    const receipt = teller.checksOutArticlesFrom(shoppingCart);
    // Assert
    expect(receipt.getTotalPrice()).toBe(expectedTotal);
  });


});
