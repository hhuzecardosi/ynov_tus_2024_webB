import {CheckoutService} from "../service/checkout.service";
import {InputException} from "./dtos/input.exception";
import {CheckoutController} from "./checkout.controller";
import {CheckoutModel} from "../service/model/checkout.model";

describe('Checkout controller', () => {
    let controller: CheckoutController;
    let service: CheckoutService;
    beforeEach(() => {
        service = new CheckoutService();
        controller = new CheckoutController(service);
    })

    it('should throw an error if basketId is not provided', async () => {
        await expect(async () => await controller.checkout({basketId: ''} )).rejects.toThrow(new InputException('basketId is required'));
    });

    // Many other error cases...

    it('should return the orderId when the checkout is successful', async () => {
        // ARRANGE
        const spy = jest.spyOn(service, 'checkout').mockResolvedValue({orderId: '1235'})

        // ACT
        const response = await controller.checkout({basketId: '1234'});

        // ASSERT
        expect(response.orderId).toBe('1235');
        expect(spy).toHaveBeenCalledWith(new CheckoutModel('1234'));
    });
});
