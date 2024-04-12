import {Role} from "../enums/role";

export class User {
    Userid?: number;
    username?: String;
    email?: String;
    password?: String;
    role?: Role[] | null;
}
