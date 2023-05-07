import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Select2Option, Select2UpdateEvent} from 'ng-select2-component';
import {PatientService} from '../../../services/patient.service';
import {RequestService} from '../../../services/request.service';
import {Patient} from '../../../common/patient';
import {Request} from '../../../common/request';
import {User} from 'src/app/common/user';

@Component({
  selector: 'app-request-upsert',
  templateUrl: './request-upsert.component.html',
  styleUrls: ['./request-upsert.component.css']
})
export class RequestUpsertComponent implements OnInit {

  patients: Patient[] = [];
  converted: any[] = [];
  data: any[] = [];
  selectedPatients: any;
  requestFormGroup!: FormGroup;
  requestToUpdate: Request = new Request();
  btnValue = 'Add Request';
  requestId!: number;

  constructor(
    private requestService: RequestService,
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.formGroupInit();
      this.initRequestToUpdate();
      this.initPatients();
    });
  }

  initRequestToUpdate() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.requestId = +this.route.snapshot.paramMap.get('id')!;
      this.requestService.getRequest(this.requestId).subscribe(
        data => {
          this.requestToUpdate = data;
          this.settingFields(this.requestToUpdate);
        }
      );
      this.btnValue = 'Update Request';
    }
  }

  initPatients() {
    this.patientService.getAllPatients().subscribe(
      data => {
        this.patients = data;
        this.converted = this.patients.map(option => ({
          value: option,
          label: option.pname
        }));
        this.data = this.converted.map(option => ({
          label: option.label,
          value: option.value
        }));
      },
      error => {
        console.log('patients error: ' + error.message);
      }
    );
  }

  formGroupInit() {
    this.requestFormGroup = this.formBuilder.group({
      requestInfo: this.formBuilder.group({
        inputRqName: new FormControl('', [Validators.required]),
        inputRqStatus: new FormControl(''),
        inputRqAmount: new FormControl('', [Validators.required]),
        inputRqPatient: new FormControl('', [Validators.required]),
      })
    });
  }

  settingFields(r: Request) {
    this.inputRqName?.setValue(r.requestName);
    this.inputRqAmount?.setValue(r.requestedAmount);
    this.inputRqStatus?.setValue(r.requestStatus);
    this.selectedPatients = r.patient.id;
  }

  get inputRqName() { return this.requestFormGroup.get('requestInfo.inputRqName'); }
  get inputRqAmount() { return this.requestFormGroup.get('requestInfo.inputRqAmount'); }
  get inputRqPatient() { return this.requestFormGroup.get('requestInfo.inputRqPatient'); }
  get inputRqStatus() { return this.requestFormGroup.get('requestInfo.inputRqStatus'); }



  //VALIDATORS
  inputRqNameValid(): boolean {
    return this.inputRqName?.invalid && (this.inputRqName?.dirty || this.inputRqName?.touched) ? true : false;
  }
  inputRqAmountValid(): boolean {
    return this.inputRqAmount?.invalid && (this.inputRqAmount?.dirty || this.inputRqAmount?.touched) ? true : false;
  }

  inputRqPatientValid(): boolean {
    return this.inputRqPatient?.invalid && (this.inputRqPatient?.dirty || this.inputRqPatient?.touched) ? true : false;
  }

  upsertRequest() {
    let r = new Request();
    r.requestName = this.inputRqName?.value;
    r.requestedAmount = this.inputRqAmount?.value;
    // TODO: tanseeh bech t7ot funder field hidden ki tabda enty makech admin

    let f = new User();




      // binding with id enough
      let p = new Patient();
      p = this.selectedPatients;
      r.patient=p;


    // add
    if (this.btnValue === 'Add Request') {
      console.log(r)
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

    // update
    if (this.btnValue === 'Update Request') {
      r.id = this.requestId;
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
    // console.log("changing " + key, event);
  }

  search(text: string) {
    this.data = text
      ? (JSON.parse(JSON.stringify(this.data)) as Select2Option[]).filter(
          option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.data));
  }

  update(key: string, event: Select2UpdateEvent<any>): any {
    // console.log(event.value);
    return event.value;
  }

}



