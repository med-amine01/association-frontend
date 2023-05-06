import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { CaisseService } from 'src/app/services/caisse.service';
import {UserAuthService} from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  solde:Number=-1
  
  constructor(private userAuthService: UserAuthService, private router: Router, private caisseService:CaisseService) { }
  ngOnInit(): void {
    this.caisseService.getSolde().subscribe(  data => {
      this.solde = data;
    })
    
    
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/dashboard']);
  }
}
