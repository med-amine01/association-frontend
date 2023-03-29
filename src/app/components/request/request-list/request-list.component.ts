import {Component, OnInit} from '@angular/core';
import {Request} from "../../../common/request";
import {RequestService} from "../../../services/request.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit{

  requests : Request[] = [];
  id !: number;
  constructor(private requestService : RequestService, private toastr : ToastrService, private location : Location) {
  }
  ngOnInit(): void {
    this.listRequests();
  }

  listRequests(){
    this.requestService.getAllRequests().subscribe(
      data =>{
        this.requests = data;
      }
    );
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
}
