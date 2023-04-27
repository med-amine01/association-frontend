import {User} from "./user";
import {TransactionHistory} from "./transaction-history";

export class Account {
  id !: number;
  funder !: User;
  transactionHistories !: TransactionHistory [];
  currentBalance !: number;
  totalBalance !: number;
  enable !: boolean;
  createdAt !: Date;
}
