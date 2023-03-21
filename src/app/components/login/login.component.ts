import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    private userService : UserService,
    private userAuthService : UserAuthService,
    private router : Router
  ) {}


  ngOnInit(): void {
  }

  login(loginForm : NgForm){
    this.isLoading = true;

    this.userService.login(loginForm.value).subscribe(
      (response : any) => {
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.user.roles);
        console.log("user logged in");
         const role = response.user.roles[0].roleName;
          this.isLoading = false;
         if(role === 'ROLE_ADMIN'){
           this.router.navigate(['/dashboard']);
         }
         else {
           // TODO : arja3 thabet mba3ed 7asseb role win bech t'hezou
           this.router.navigate(['/forbidden'])
         }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
