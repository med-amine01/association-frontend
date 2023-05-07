import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Project} from 'src/app/common/project';
import {ProjectService} from 'src/app/services/project.service';
import {UserAuthService} from "../../../services/user-auth.service";
import {Role} from "../../../common/role";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit{

  projects : Project[] = [];
  id !: number;
  isFunder : boolean = false;
  constructor(
    private userAuthService : UserAuthService,
    private projectService : ProjectService,
    private toastr: ToastrService,
    private location: Location)
  {}

  ngOnInit(): void {
    this.listProjects();
    this.isFunder = this.userAuthService.isFunderRole();
  }

  setIdForModel(id : number){
    this.id = id;
  }

  listProjects(){
    this.projectService.getAllProjects().subscribe(
      data => {
        this.projects = data;
      }
    );
  }


  deleteProject(){
    this.projectService.deleteProject(this.id).subscribe(
      data => {
          this.toastr.success("Project with ID = " + this.id + " Deleted Successfully");
          this.location.go(this.location.path());
          window.location.reload();
      },
      error => {
        console.log(error.message());
      }
    );
  }

  calculateProgress(estimated : number, achieved : number) : number{

    const progression = (achieved - 0) / (estimated - 100);
    const percentageProgression = progression * 100;

    if(percentageProgression > 100){
      return 100;
    }
    return Math.floor(percentageProgression);
  }
}
