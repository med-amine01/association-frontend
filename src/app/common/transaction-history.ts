import {Account} from "./account";

export class TransactionHistory {
  id !: number;
  transactionType !:  string;
  account !: Account;
  transactionDate !: Date;
  amount !: number;
}
