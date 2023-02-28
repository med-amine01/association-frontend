import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  users : User[] = [];
  id !: string;

  constructor(
    private userService : UserService,
    private toastr : ToastrService,
    private location : Location
    ){}

  ngOnInit(): void {
    this.listUsers();
  }

  setIdForModel(id : string){
    this.id = id;
  }

  listUsers(){
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  deleteUser(){
    this.userService.deleteUser(this.id).subscribe(
      data => {
          this.toastr.success("User with ID = " + this.id + " Deleted Successfully");
          this.location.go(this.location.path());
          window.location.reload();
      },
      error => {
        console.log(error.message());
      }
    )
  }
}
