import {User} from "./user";
import {Patient} from "./patient";
import {Project} from "./project";

export class Request {
  id!: number;
  requestName !: string;
  requestStatus!: string;
  requestedAmount!: number;
  funder!: User;
  patient!: Patient;
  projects!: Project [];
  createdAt !: Date;
  updatedAt !: Date;
}
