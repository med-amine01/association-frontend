import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserAuthService} from '../services/user-auth.service';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService : UserAuthService, private router : Router, private userService : UserService)
  {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    if(this.userAuthService.getToken() !== null){
      //this route.data will be fetched from route in app.modules.ts
      const role = route.data["roles"] as Array<string>;
      if(role){
        const match = this.userService.roleMatch(role);

        if(match){
          return true;
        }
        else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

  //THIS AUTHGUARD will decide if a path should be accessible to user or NOT


}
