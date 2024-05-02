import {CheckoutModel} from "./model/checkout.model";
import {CompleteCheckout} from "./model/complete-checkout";

export class CheckoutService {
    checkout(checkoutData: CheckoutModel): Promise<CompleteCheckout> {
        return Promise.resolve({orderId: '9'});
    }

}
