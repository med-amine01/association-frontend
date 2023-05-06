import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../common/account';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

  private ACCOUNT_API_URL = 'http://localhost:8090/api/caisse';
  constructor(private httpClient : HttpClient) { }

  getSolde() : Observable<any>{
    return this.httpClient.get<any>(this.ACCOUNT_API_URL+"/getsolde");
  }

  depositMoney(amount: number): Observable<any>{
    return this.httpClient.post<any>(this.ACCOUNT_API_URL+"/Addsolde",amount);
  }
  withdrawMoney(amount : number) : Observable<any> {
    return this.httpClient.post(this.ACCOUNT_API_URL+"/retiresolde", amount);
  }

 
}
