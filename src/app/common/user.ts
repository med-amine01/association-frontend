import {Role} from "./role";
import {Account} from "./account";

export class User {

    userEmail !: string;
    userFirstName !: string;
    uuid !: string;
    userLastName !: string;
    userPassword !: string;
    phone !: string;
    address !: string;
    active !: boolean;
    roles !: Role[];
    account !: Account;
}
