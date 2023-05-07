import {Component, OnInit} from '@angular/core';
import {Request} from "../../../common/request";
import {RequestService} from "../../../services/request.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {UserAuthService} from 'src/app/services/user-auth.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit{

  requests : Request[] = [];
  id !: number;
  constructor(private requestService : RequestService,
              private toastr : ToastrService,
              private location : Location,
              private userauth:UserAuthService,
              private userService:UserService) {
  }
  ngOnInit(): void {
    this.listRequests();
  }

  listRequests(){
    if(this.userauth.isFunderRole()) {
      let uid = this.userauth.getUserUid();
      // @ts-ignore
      this.requestService.getRequestsByUid(uid).subscribe(
        data =>{
          this.requests = data;
        }
      );
    }
    if(this.userauth.isSgRole()){
      this.requestService.getRequestByStatus("ACCEPTED_TO_SG").subscribe(
        data =>{
          this.requests = data;
        }
      );
    }
    else if(this.userauth.isAdminRole()){
      this.requestService.getRequestByStatus("REVIEW").subscribe(
        data =>{
          this.requests = data;
        }
      );
    }
    else if(this.userauth.isWorkerRole()){
      this.requestService.getRequestByStatus("REVIEW").subscribe(
        data =>{
          this.requests = data;
        }
      );
    }

  }

  deleteRequest(){
    this.requestService.deleteRequest(this.id).subscribe(
      data => {
        this.toastr.success("Request with ID = " + this.id + " Deleted Successfully");
        this.location.go(this.location.path());
        window.location.reload();
      },
      error =>{
        console.log(error.message());
      }
    );
  }

  setIdForModel(id : number){
    this.id = id;
  }
  accepReq(request:Request){
    if(this.userauth.isSgRole()){
      request.requestStatus="ACCEPTED_SG"
      this.requestService.updateRequest(request).subscribe(
        data =>{
          this.toastr.success("Request Accepted")
          console.log("ACCEPTED_SG")
               }
      );
    }
    else if(this.userauth.isAdminRole()){
      if(request.requestedAmount>100){
        request.requestStatus="ACCEPTED_TO_SG"
      }
      else{
        request.requestStatus="ACCEPTED_ADMIN"
      }
      this.requestService.updateRequest(request).subscribe(
        data =>{
          this.toastr.success("Request Accepted")
            }
      );
    }
    location.reload()
  }
  roleMatching(role : any){
    //console.log("matching = " + this.userService.roleMatch(role));
    return this.userService.roleMatch(role);
  }
}
