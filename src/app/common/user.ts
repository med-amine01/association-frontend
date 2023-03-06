import { Role } from "./role";

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
}
