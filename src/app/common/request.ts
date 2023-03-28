import {User} from "./user";
import {Patient} from "./patient";

export class Request {
  id!:number;
  requestName !: string;
  requestStatus!:string;
  requestedAmount!:number;
  funder!:User;
  patients!: Patient [];
  createdAt !: Date;
  updatedAt !: Date;
}
