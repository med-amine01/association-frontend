import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../common/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private ROLE_API_URL = 'http://localhost:8080/api/role';

  constructor(private httpClient : HttpClient) { }

  getAllRoles() : Observable<Role[]>{
    return this.httpClient.get<any>(this.ROLE_API_URL+"/getall");
  }
}

interface GetPatients
{
  _embedded:{
    patients: Role[];
  }
}