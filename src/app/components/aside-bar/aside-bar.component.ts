import {Component} from '@angular/core';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.css']
})
export class AsideBarComponent {

  constructor(private userService : UserService)
  {}

  roleMatching(role : any){
    //console.log("matching = " + this.userService.roleMatch(role));
    return this.userService.roleMatch(role);
  }


}
