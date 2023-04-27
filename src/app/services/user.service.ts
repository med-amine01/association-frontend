import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../common/user';
import {UserAuthService} from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:8090";
  USER_API_URL = "http://localhost:8090/api/user";

  requestHeader = new HttpHeaders({
    "No-Auth": "True"
  });

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) { }
  addUser(user: User): Observable<any> {
    return this.httpClient.post<User>(this.USER_API_URL + "/addUser", user);
  }

  updateUser(user: User, email : string) {
    return this.httpClient.patch<User>(this.USER_API_URL + "/update/"+email, user);
  }

  deleteUser(id: string) {
    return this.httpClient.delete<User>(this.USER_API_URL + "/delete/" + id);
  }

  getUserByRole(role : string): Observable<User[]> {
    return this.httpClient.get<any>(this.USER_API_URL + "/getByRole/"+role);
  }
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<any>(this.USER_API_URL + "/getall");
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(this.USER_API_URL + "/" + id);
  }
  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/authenticate", loginData, { headers: this.requestHeader });
  }

  //@ts-ignore
  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
      return isMatch;
    }
  }
}

interface GetPatients
{
  _embedded:{
    users: User[];
  }
}
