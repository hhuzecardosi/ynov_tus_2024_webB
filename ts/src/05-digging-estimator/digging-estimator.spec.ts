import {DiggingEstimator, TunnelTooLongForDelayException} from "./digging-estimator";
import {VinApiFacade} from "./external/vin-api-facade";

class FakeApiFacade implements VinApiFacade {
    get(rockType: string): number[] {
      return [0, 3, 5.5, 7];
    }
}

describe("digging estimator", () => {

  it("should return as Dr Pockovsky said", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimator(new FakeApiFacade());

    const result = estimator.tunnel(28, 2, "granite");

    expect(result.total).toBe(48);
  });

  it("should return an error if tunnel cannot be dug because too long", () => {
    const estimator = new DiggingEstimator(new FakeApiFacade());

   expect(() => estimator.tunnel(36, 2, "granite")).toThrow(new TunnelTooLongForDelayException());

  });

  it("should return as Dr Pockovsky said for 1m tunnel", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimator(new FakeApiFacade());

    const result = estimator.tunnel(1, 2, "granite");

    expect(result.total).toBe(0);
  });
});
