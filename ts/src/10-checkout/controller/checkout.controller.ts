import {CheckoutService} from "../service/checkout.service";
import {CheckoutRequestDto} from "./dtos/checkout-request.dto";
import {CheckoutResponseDto} from "./dtos/checkout-response.dto";
import {InputException} from "./dtos/input.exception";
import {CheckoutModel} from "../service/model/checkout.model";

export class CheckoutController {
    constructor(readonly service: CheckoutService) {
    }

    checkout(checkoutData: CheckoutRequestDto): Promise<CheckoutResponseDto> {
        if (!checkoutData.basketId) {
            throw new InputException('basketId is required');
        }
        return this.service.checkout(new CheckoutModel(checkoutData.basketId));
    }
}
