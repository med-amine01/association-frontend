import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Role} from '../common/role';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly ROLE_API_URL: string = environment.API_BASE_URL + '/api/role';

  constructor(private httpClient: HttpClient) {
  }

  getAllRoles(): Observable<Role[]> {
    return this.httpClient.get<any>(this.ROLE_API_URL + "/getall");
  }
}

