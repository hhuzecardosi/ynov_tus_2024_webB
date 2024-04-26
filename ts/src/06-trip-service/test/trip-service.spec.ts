import "jest";
import User from "../src/user/User";
import Trip from "../src/trip/Trip";
import TripService from "../src/trip/TripService";
import {IUserSession} from "../src/user/IUserSession";

class FakeUserSession implements IUserSession {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  getLoggedUser(): User {
    return this.user;
  }
}

describe("TripServiceShould", () => {
  let u1: User;
  let u2: User;
  let tripService: TripService;
  let userSession: FakeUserSession;

  beforeEach(() => {
    u1 = new User();
    u2 = new User();
  });

  it("should create a user", () => {
    expect(u1).toBeDefined();
  });

  it('should add friend to a user', () => {
    // ACT
    u1.addFriend(u2);
    u2.addFriend(u1);

    // ASSERT
    expect(u1.getFriends()).toContain(u2);
    expect(u2.getFriends()).toContain(u1);
  });

  it('should add trip to a user', () => {
    // ARRANGE
    const trip = new Trip();

    // ACT
    u1.addTrip(trip);

    // ASSERT
    expect(u1.getTrips()).toContain(trip);
  });

  it('should return trips of a user', () => {
    // ARRANGE
    const trip = new Trip();
    u1.addTrip(trip);

    // ACT
    const trips = u1.getTrips();

    // ASSERT
    expect(trips).toContain(trip);
  });

  it('should the list of trip for a user with one friend and one trip', () => {
    // ARRANGE
    const trip = new Trip();
    u1.addTrip(trip);
    u1.addFriend(u2);
    userSession = new FakeUserSession(u1);
    tripService = new TripService(userSession);


    // ACT
    const trips = tripService.getTripsByUser(u1);

    // ASSERT
    expect(trips).toContain(trip);
  });
});
