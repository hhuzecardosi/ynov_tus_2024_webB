import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";
import {IUserSession} from "../user/IUserSession";

export default class TripService {
    userSession: IUserSession;

    constructor(userSession?: IUserSession) {
        this.userSession = userSession || UserSession;
    }

    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const loggedUser: User = this.userSession.getLoggedUser();
        let isFriend: boolean = false;

        if (loggedUser != null) {
            for (const friend of user.getFriends()) {
                if (friend === loggedUser) {
                    isFriend = true;
                    break;
                }
            }

            if (isFriend) {
                tripList = TripDAO.findTripsByUser(user);
            }

            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }
}
