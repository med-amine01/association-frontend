import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { CaisseService } from 'src/app/services/caisse.service';
import {UserAuthService} from 'src/app/services/user-auth.service';
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  solde:number=-1;
  currentUser : User = new User();
  isFunder : boolean = false;
  currentBalance : number = 0;
  accountId : number = 0;
  constructor(private userAuthService: UserAuthService,
              private userService : UserService,
              private router: Router,
              private caisseService:CaisseService) { }

  ngOnInit(): void {
    if(this.isLoggedIn()) {
      this.getCurrentUser();
      this.caisseService.getSolde().subscribe(  data => {
        this.solde = data;
      })
    }
  }

  getCurrentUser() {
    const userUid = this.userAuthService.getUserUid();
    // @ts-ignore
    this.userService.getUser(userUid).subscribe(
      data => {
        this.currentUser = data;
        this.currentBalance = data.account[0].currentBalance;
        this.accountId = data.account[0].id;
      },
      error => {
        console.log(error.message());
      }
    );
    this.isFunder = this.userAuthService.isFunderRole();
  }
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    //window.location.reload();
    this.router.navigate(['/login']);
  }

}
