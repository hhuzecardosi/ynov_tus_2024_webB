import User from "./User";

export interface IUserSession {
    getLoggedUser(): User;
}
