import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CaisseService {

  private readonly ACCOUNT_API_URL: string = environment.API_BASE_URL + '/api/caisse';

  constructor(private httpClient: HttpClient) {
  }

  getSolde(): Observable<any> {
    return this.httpClient.get<any>(this.ACCOUNT_API_URL + "/getsolde");
  }

  depositMoney(amount: number): Observable<any> {
    return this.httpClient.post<any>(this.ACCOUNT_API_URL + "/Addsolde", amount);
  }

  withdrawMoney(amount: number): Observable<any> {
    return this.httpClient.post(this.ACCOUNT_API_URL + "/retiresolde", amount);
  }


}
