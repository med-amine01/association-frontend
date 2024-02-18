import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {User} from 'src/app/common/user';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  id !: string;
  currentItemList !: string;
  itemList = [
    {key: 'FUNDER', value: 'ROLE_FUNDER'},
    {key: 'ADMIN', value: 'ROLE_ADMIN'},
    {key: 'CEO', value: 'ROLE_CEO'},
    {key: 'SG', value: 'ROLE_SG'},
    {key: 'WORKER', value: 'ROLE_WORKER'},
  ];


  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.listUsers();
  }

  setIdForModel(id: string) {
    this.id = id;
  }

  getItemValue(item: string) {
    this.currentItemList = item;
    this.getByRole(item, true);
  }

  listUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  getByRole(r: string, s: boolean) {
    this.userService.getUserByCriteria(r, s).subscribe(
      data => {
        this.users = data;
      }
    );
  }

  disableUser() {
    this.userService.disableUser(this.id).subscribe(
      data => {
        this.toastr.success("User with UID = " + this.id + " Disabled Successfully");
        this.location.go(this.location.path());
        window.location.reload();
      },
      error => {
        console.log(error.message());
      }
    )
  }


  enableUser() {
    this.userService.enableUser(this.id).subscribe(
      data => {
        this.toastr.success("User with UID = " + this.id + " Enabled Successfully");
        this.location.go(this.location.path());
        window.location.reload();
      },
      error => {
        console.log(error.message());
      }
    )
  }
}
