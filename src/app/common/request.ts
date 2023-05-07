import {User} from "./user";
import {Patient} from "./patient";

export class Request {
  id!:number;
  requestName !: string;
  requestStatus!:string;
  requestedAmount!:number;
  patient!: Patient ;
  createdAt !: Date;
  updatedAt !: Date;
}
