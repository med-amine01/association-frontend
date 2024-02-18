import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {UserAuthService} from "../../services/user-auth.service";

@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.css']
})
export class AsideBarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private userService: UserService,
              private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userAuthService.isLoggedIn();
  }

  roleMatching(role: any) {
    return this.userService.roleMatch(role);
  }
}
