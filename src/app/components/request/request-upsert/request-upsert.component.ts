import { Component } from '@angular/core';
import {Role} from "../../../common/role";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../common/user";
import {RoleService} from "../../../services/role.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Select2Option, Select2UpdateEvent} from "ng-select2-component";
import {PatientService} from "../../../services/patient.service";
import {Patient} from "../../../common/patient";
import {Request} from "../../../common/request";
import {RequestService} from "../../../services/request.service";

@Component({
  selector: 'app-request-upsert',
  templateUrl: './request-upsert.component.html',
  styleUrls: ['./request-upsert.component.css']
})
export class RequestUpsertComponent {

  funders : User[] = [];
  patients : Patient [] = [];
  converted: any[] = [];
  data: any[] = [];
  selectedPatients: any[]=[];
  requestFormGroup!: FormGroup;
  requestToUpdate: Request = new Request();
  btnValue = 'Add Request';
  Requestid !: number;

  constructor(
    private requestService : RequestService,
    private patientService : PatientService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.formGroupInit();
      this.initRequestToUpdate();
      this.initFunders();
      this.initPatients();
    });
  }


  initRequestToUpdate() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.Requestid = +this.route.snapshot.paramMap.get('id')!;
      this.requestService.getRequest(this.Requestid).subscribe(
        data => {
          this.requestToUpdate = data;
          this.settingFields(this.requestToUpdate);
        }
      );
      this.btnValue = "Update Request";
    }
  }

  initPatients(){
    this.patientService.getAllPatients().subscribe(
      data => {
        this.patients = data;

        //this will map :
        // roleName => value
        // roleDescription => label
        this.converted = this.patients.map(option => ({
          value: option.id,
          label: option.pname
        }));

        //this will set the array "data" to pass it to html <ngselect [data]="data">
        this.data = [{
          label: "Patients",
          options: this.converted
        }]
      },
      error => {
        console.log("patients error : "+error.message);
      }
    )
  }
  initFunders(){
    this.userService.getUserByRole("ROLE_FUNDER").subscribe(
      data=>{
        this.funders = data;
      },
      error => {
        console.log("error getting funders " + error.message);
      }
    )
  }

  formGroupInit() {
    this.requestFormGroup = this.formBuilder.group({
      requestInfo: this.formBuilder.group({
        inputRqName: new FormControl('', [Validators.required]),
        inputRqStatus: new FormControl(''),
        inputRqAmount: new FormControl('', [Validators.required]),
        inputRqFunder: new FormControl('', [Validators.required]),
        inputRqPatient: new FormControl('', [Validators.required]),
      })
    })
  }

  settingFields(r: Request) {
    this.inputRqName?.setValue(r.requestName);
    this.inputRqAmount?.setValue(r.requestedAmount);
    this.inputRqStatus?.setValue(r.requestStatus);
    this.inputRqFunder?.setValue(r.funder.userFirstName);

    r.patients.forEach(element => {
      this.selectedPatients.push(element.pname);
    });

    console.log(this.selectedPatients);
    this.inputRqPatient?.setValue(["Rocky Hettinger"]);
  }

  get inputRqName() { return this.requestFormGroup.get('requestInfo.inputRqName'); }
  get inputRqAmount() { return this.requestFormGroup.get('requestInfo.inputRqAmount'); }
  get inputRqFunder() { return this.requestFormGroup.get('requestInfo.inputRqFunder'); }
  get inputRqPatient() { return this.requestFormGroup.get('requestInfo.inputRqPatient'); }
  get inputRqStatus() { return this.requestFormGroup.get('requestInfo.inputRqStatus'); }


  //VALIDATORS
  inputRqNameValid(): boolean {
    return this.inputRqName?.invalid && (this.inputRqName?.dirty || this.inputRqName?.touched) ? true : false;
  }
  inputRqAmountValid(): boolean {
    return this.inputRqAmount?.invalid && (this.inputRqAmount?.dirty || this.inputRqAmount?.touched) ? true : false;
  }
  inputRqFunderValid(): boolean {
    return this.inputRqFunder?.invalid && (this.inputRqFunder?.dirty || this.inputRqFunder?.touched) ? true : false;
  }
  inputRqPatientValid(): boolean {
    return this.inputRqPatient?.invalid && (this.inputRqPatient?.dirty || this.inputRqPatient?.touched) ? true : false;
  }


  // upsertUser() {
  //   let u = new User();
  //   u.userFirstName = this.inputRqAmount?.value;
  //   u.userLastName = this.inputRqFunder?.value;
  //   u.phone = this.inputPhone?.value;
  //   u.address = this.inputAddress?.value;
  //
  //   //you have to initilize roles before pushing inside the array because you will have error :
  //   //u.roles is undefined
  //   u.roles = [];
  //   this.selectedRoles.forEach(element => {
  //     u.roles.push({
  //       roleName : element,
  //       roleDescription : ''
  //     })
  //   });
  //
  //
  //   //add
  //   if (this.btnValue == 'Add User') {
  //     u.userEmail = this.inputRqName?.value;
  //     u.userPassword = this.inputRqPatient?.value;
  //     console.log(+ JSON.stringify(u));
  //     this.userService.addUser(u).subscribe(
  //       data => {
  //         this.toastr.success("User Added Successfully !");
  //         this.router.navigate(['/user']);
  //       }, error => {
  //         alert("There was an error: " + error.message());
  //       }
  //     );
  //   }
  //
  //   //update
  //   if (this.btnValue == 'Update User') {
  //     this.inputRqPatient?.clearValidators();
  //     this.inputRqName?.clearValidators();
  //     console.log(this.userUid);
  //     this.userService.updateUser(u, this.userUid).subscribe(
  //       data => {
  //         this.toastr.success("User Updated Successfully !");
  //         this.router.navigate(['/user']);
  //       },
  //       error => {
  //         this.toastr.error("Error Updating + " + error.message());
  //       }
  //     );
  //   }
  // }

  onSubmit() {
    if (this.requestFormGroup.invalid) {
      if(this.btnValue == 'Add User'){
        this.requestFormGroup.markAllAsTouched();
        this.toastr.warning("Please fill the form properly!");
        return;
      }
    }

    //this.upsertUser();

    this.requestFormGroup.reset();
  }

  change(key: string, event: Event) {
    //console.log("changing " + key, event);
  }
  search(text: string) {
    this.data = text
      ? (JSON.parse(JSON.stringify(this.data)) as Select2Option[]).filter(
        option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1,
      )
      : JSON.parse(JSON.stringify(this.data));
  }
  update(key: string, event: Select2UpdateEvent<any>): any {

    //console.log(event.value);
    return event.value;
  }
}
