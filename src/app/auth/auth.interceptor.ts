import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {UserAuthService} from "../services/user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //checking if our header doesn't contain Authorization
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    //fetch token from localstorage
    const token = this.userAuthService.getToken();
    req = this.addToken(req, token);

    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          console.log("status " + err.status);
          //this user is not logged in (Unauthorized)
          if (err.status === 401) {
            this.router.navigate(['/login']);
          } else if (err.status === 403) {
            //acces denied and redirect to forbidden
            this.router.navigate(['/forbidden']);
          }
          return throwError("something is wrong");
        }
      )
    );
  }

  //this function will add token to the header
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        //this will get inside the http header and set the Authorization with start of 'Bearer '+token
        Authorization: `Bearer ${token}`
      }
    });
  }

}
