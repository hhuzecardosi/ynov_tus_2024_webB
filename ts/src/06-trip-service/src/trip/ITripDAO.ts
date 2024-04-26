import Trip from "./Trip";
import User from "../user/User";

export interface ITripDAO {
    findTripsByUser(user: User): Trip[];
}
