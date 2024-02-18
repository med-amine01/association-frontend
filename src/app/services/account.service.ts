import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account} from "../common/account";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly ACCOUNT_API_URL: string = environment.API_BASE_URL + '/api/account';

  constructor(private httpClient: HttpClient) {
  }

  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<any>(this.ACCOUNT_API_URL + "/getall");
  }

  getProject(id: number): Observable<Account> {
    return this.httpClient.get<Account>(this.ACCOUNT_API_URL + "/" + id);
  }

  depositMoney(account: Account): Observable<any> {
    return this.httpClient.post(this.ACCOUNT_API_URL + "/deposit", account);
  }

  withdrawMoney(account: Account): Observable<any> {
    return this.httpClient.post(this.ACCOUNT_API_URL + "/deposit", account);
  }
}
