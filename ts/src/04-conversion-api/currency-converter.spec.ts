import {CurrencyConverter} from "./currency-converter";
import {ConversionRateApi} from "./external/conversion-rate-api";
import {Currency} from "./model/currency";
import {Money} from "./model/money";
import {CurrencyIsoCode} from "./external/currency-iso-code";

class ConverterFake {
    getRate(): number {
        return 2;
    }
}


describe("CurrencyConverter", function () {
    let converter: CurrencyConverter;
    let conversionRateApi: ConversionRateApi;

    beforeEach(() => {
        conversionRateApi = new ConversionRateApi();
        converter = new CurrencyConverter(conversionRateApi);
    })


    it('should be defined', () => {
        expect(converter).toBeDefined();
    });

    it('should not call the API if no conversion is needed', () => {
        // ACT
        const result = converter.sum(Currency.Euro);

        // ASSERT
        expect(result).toEqual(new Money(0, Currency.Euro));
    });


    describe('when using mocks', () => {
        it('should perform the conversion on one single money', () => {
            // ARRANGE
            const dollarToEuroConversionRate = 0.8;
            jest.spyOn(conversionRateApi, "getRate").mockReturnValue(dollarToEuroConversionRate);

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar));

            // ASSERT
            expect(result).toEqual(new Money(2 * dollarToEuroConversionRate, Currency.Euro));
        });

        it('should not perform twice the same call', () => {
            // ARRANGE
            const dollarToEuroConversionRate = 0.8;
            const mock = jest.spyOn(conversionRateApi, "getRate").mockReturnValue(dollarToEuroConversionRate);

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(1, Currency.Dollar));

            // ASSERT
            expect(result).toEqual(new Money(3 * dollarToEuroConversionRate, Currency.Euro));
            expect(mock).toHaveBeenCalledTimes(1);                                  // <-- Boite blanche <== LE PLUS IMPORTANT
            expect(mock).toHaveBeenCalledWith(CurrencyIsoCode.USD, CurrencyIsoCode.EUR);    // <-- Boite noire
        });

        it('should take into account the different rates', () => {
            // ARRANGE
            const dollarToEuroConversionRate = 0.8;
            const poundToEuroConversionRate = 1.2;
            jest.spyOn(conversionRateApi, "getRate").mockImplementation((source) => {
                if (source === CurrencyIsoCode.GBP) {
                    return poundToEuroConversionRate;
                }
                return dollarToEuroConversionRate;
            });

            // ACT
            const result = converter.sum(Currency.Euro, new Money(2, Currency.Dollar), new Money(2, Currency.Pound));

            // ASSERT
            expect(result).toEqual(new Money(2 * dollarToEuroConversionRate + 2 * poundToEuroConversionRate, Currency.Euro));
        });
    });

    describe('when using fakes', () => {
        beforeEach(() => {
            const conversionRateApi = new ConverterFake();
            converter = new CurrencyConverter(conversionRateApi);
        })
    });
});
