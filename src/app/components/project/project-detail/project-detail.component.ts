import {Component} from '@angular/core';
import {User} from "../../../common/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {ToastrService} from "ngx-toastr";
import {Request} from "../../../common/request";
import {UserAuthService} from "../../../services/user-auth.service";
import {Project} from "../../../common/project";
import {RequestService} from "../../../services/request.service";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {
  projectId !: number;
  currentUser : User = new User();
  currentBalance :number = 0;
  balanceFromGroup!: FormGroup;
  currentProject : Project = new Project();
  constructor(private formBuilder: FormBuilder,
              private userService : UserService,
              private requestService : RequestService,
              private userAuthService : UserAuthService,
              private route: ActivatedRoute,
              private router : Router,
              private accountService : AccountService,
              private toastr: ToastrService,
              private projectService : ProjectService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.projectId = +this.route.snapshot.paramMap.get('id')!;
      this.getCurrentUser();
      this.formGroupInit();
      this.initProject(this.projectId);
    });
  }

  initProject(id : number) {
    this.projectService.getProject(id).subscribe(
      data => {
        this.currentProject = data;
      }
    );
  }
  formGroupInit() {
    this.balanceFromGroup = this.formBuilder.group({
      balanceInfo : this.formBuilder.group({
        inputBalance : new FormControl('', [Validators.required])
      })
    })
  }

  get inputBalance() { return this.balanceFromGroup.get('balanceInfo.inputBalance'); }
  inputBalanceValide(): boolean {
    return this.inputBalance?.invalid && (this.inputBalance?.dirty || this.inputBalance?.touched) ? true : false;
  }

  getCurrentUser() {
    const userUid = this.userAuthService.getUserUid();
    // @ts-ignore
    this.userService.getUser(userUid).subscribe(
      data => {
        this.currentUser = data;
        this.currentBalance = data.account[0].currentBalance;
      },
      error => {
        console.log(error.message());
      }
    );
  }
  onSubmitBalance() {
    //check if it's empty
    if(this.balanceFromGroup.invalid) {
      this.balanceFromGroup.markAllAsTouched();
      this.toastr.warning("please enter an amount !");
      return;
    }

    //check if funder got enough money
    if(this.inputBalance?.value > this.currentBalance) {
      this.balanceFromGroup.markAllAsTouched();
      this.toastr.error("You don't have enough balance !");
      return;
    }

    let request = new Request();
    request.requestName = this.currentUser.userFirstName + " is requesting to fund project N° " + this.projectId;
    request.requestedAmount = this.inputBalance?.value;
    let u = new User();
    u.userEmail = this.currentUser.userEmail;
    request.funder = u;
    //request.funder.userEmail = this.currentUser.userEmail;
    let p = new Project();
    p.id = this.projectId;
    request.projects = [];
    request.projects.push(p);

    console.log(request);
    this.requestService.addRequest(request).subscribe(
      data => {
        this.toastr.success("YOUR REQUEST HAS BEEN ADDED SUCCEFULLY ");
        this.router.navigate(['/request']);
      },
      error => {
        console.log(error.message);
      }
    );
  }
}
