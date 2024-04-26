import CollaboratorCallException from "../exception/CollaboratorCallException";
import User from "./User";
import {IUserSession} from "./IUserSession";

class UserSession implements IUserSession{
    public getLoggedUser(): User {
        throw new CollaboratorCallException(
            "UserSession.getLoggedUser() should not be called in an unit test",
        );
    }
}

export default new UserSession();
