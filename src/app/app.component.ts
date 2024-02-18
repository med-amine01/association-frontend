import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "./services/user-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Asso';
  isLoggedIn: boolean = false;

  constructor(private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userAuthService.isLoggedIn();
  }
}
