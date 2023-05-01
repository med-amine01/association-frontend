import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../common/user";
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
    this.userService.getUserByCriteria("ROLE_FUNDER",true).subscribe(
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
    this.inputRqFunder?.setValue(r.funder.userEmail);

    //don't forget to use id to bind objects with select 2
    r.patients.forEach(element => {
      this.selectedPatients.push(element.id);
    });
    this.inputRqPatient?.setValue(this.selectedPatients);
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


  upsertRequest() {

    let r = new Request();
    r.requestName = this.inputRqName?.value;
    r.requestedAmount = this.inputRqAmount?.value;
    //TODO : tanseeh bech t7ot funder field hidden ki tabda enty makech admin

    let f = new User();
    f.userEmail = this.inputRqFunder?.value;
    r.funder = f;

    r.patients = [];
    this.selectedPatients.forEach(element => {
      //binding with id enough
      let p = new Patient();
      p.id = element;
      r.patients.push(p);
    });



    //add
    if (this.btnValue == 'Add Request') {
      this.requestService.addRequest(r).subscribe(
        data => {
          this.toastr.success("Request Added Successfully !");
          this.router.navigate(['/request']);
        },
        error => {
          this.toastr.error("Error Updating + " + error.message());
        }
      );
    }

    //update
    if (this.btnValue == 'Update Request') {
        r.id = this.Requestid;
        r.requestStatus = this.inputRqStatus?.value;

      this.requestService.updateRequest(r).subscribe(
        data => {
          this.toastr.success("Request Updated Successfully !");
          this.router.navigate(['/request']);
        },
        error => {
          this.toastr.error("Error Updating + " + error.message());
        }
      );
    }
  }

  onSubmit() {
    if (this.requestFormGroup.invalid) {
      this.requestFormGroup.markAllAsTouched();
      this.toastr.warning("Please fill the form properly!");
      return;
    }

    this.upsertRequest();

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
