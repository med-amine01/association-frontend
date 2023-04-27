import {Component, OnInit} from '@angular/core';
import {Account} from "../../../common/account";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit{
  accounts : Account [] = [];

  constructor(private accountService : AccountService) {
  }

  ngOnInit(): void {
    this.listAccounts();
  }

  listAccounts() {
    this.accountService.getAllAccounts().subscribe(
      data => {
        this.accounts = data;
      },
      error => {
        console.log(error.message())
      }
    );
  }
}
