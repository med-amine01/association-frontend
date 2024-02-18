import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Request} from "../common/request";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly REQUEST_API_URL: string = environment.API_BASE_URL + '/api/request';

  constructor(private httpClient: HttpClient) {
  }


  getRequestsByUid(uid: string): Observable<Request[]> {
    return this.httpClient.get<any>(this.REQUEST_API_URL + "/funder/" + uid);
  }

  addRequest(request: Request): Observable<any> {
    return this.httpClient.post(this.REQUEST_API_URL + '/add', request);
  }

  updateRequest(request: Request) {
    return this.httpClient.patch<Request>(this.REQUEST_API_URL + "/update", request);
  }

  deleteRequest(id: number) {
    return this.httpClient.delete<Request>(this.REQUEST_API_URL + "/delete/" + id);
  }

  getAllRequests(): Observable<Request[]> {
    return this.httpClient.get<any>(this.REQUEST_API_URL + "/getAll");
  }

  getRequest(id: number): Observable<Request> {
    return this.httpClient.get<Request>(this.REQUEST_API_URL + "/get/" + id);
  }

  getRequestByStatus(status: string): Observable<Request[]> {
    return this.httpClient.get<any>(this.REQUEST_API_URL + "/requestStatus/" + status);
  }
}

interface GetRequests {
  _embedded: {
    requests: Request[];
  }
}

