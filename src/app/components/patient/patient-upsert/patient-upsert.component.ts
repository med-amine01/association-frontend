import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Patient} from 'src/app/common/patient';
import {PatientService} from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-upsert',
  templateUrl: './patient-upsert.component.html',
  styleUrls: ['./patient-upsert.component.css']
})
export class PatientUpsertComponent implements OnInit {

  patientFormGroup!: FormGroup;
  patientToUpdate: Patient = new Patient();
  btnValue = 'Add Patient';
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.formGroupInit();
      this.initPatientToUpdate();
    });
  }

  initPatientToUpdate() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.id = +this.route.snapshot.paramMap.get('id')!;
      this.patientService.getPatient(this.id).subscribe(
        data => {
          this.patientToUpdate = data;
          this.settingFields(this.patientToUpdate);
          //console.log("data = " + JSON.stringify(this.projectToUpdate));
        }
      );
      this.btnValue = "Update Patient";
    }
  }

  formGroupInit() {
    this.patientFormGroup = this.formBuilder.group({
      patientInfo: this.formBuilder.group({
        inputName: new FormControl('', [Validators.required]),
        inputAddress: new FormControl(''),
        inputNumber: new FormControl('', [Validators.required]),
        inputHealthStatus: new FormControl('', [Validators.required]),
        inputAmountNeeded: new FormControl('', [Validators.required]),
      })
    });
  }

  settingFields(p: Patient) {
    this.inputName?.setValue(p.pname);
    this.inputAddress?.setValue(p.paddress);
    this.inputNumber?.setValue(p.pnumber);
    this.inputHealthStatus?.setValue(p.healthStatus);
    this.inputAmountNeeded?.setValue(p.fundingNeeded);
  }

  get inputName() {
    return this.patientFormGroup.get('patientInfo.inputName');
  }

  get inputAddress() {
    return this.patientFormGroup.get('patientInfo.inputAddress');
  }

  get inputNumber() {
    return this.patientFormGroup.get('patientInfo.inputNumber');
  }

  get inputHealthStatus() {
    return this.patientFormGroup.get('patientInfo.inputHealthStatus');
  }

  get inputAmountNeeded() {
    return this.patientFormGroup.get('patientInfo.inputAmountNeeded');
  }

  //VALIDATORS
  inputNameValid(): boolean {
    return this.inputName?.invalid && (this.inputName?.dirty || this.inputName?.touched) ? true : false;
  }

  inputNumberValid(): boolean {
    return this.inputNumber?.invalid && (this.inputNumber?.dirty || this.inputNumber?.touched) ? true : false;
  }

  inputHealthStatusValid(): boolean {
    return this.inputHealthStatus?.invalid && (this.inputHealthStatus?.dirty || this.inputHealthStatus?.touched) ? true : false;
  }

  inputAmountNeededValid(): boolean {
    return this.inputAmountNeeded?.invalid && (this.inputAmountNeeded?.dirty || this.inputAmountNeeded?.touched) ? true : false;
  }

  upsertProject() {
    let p = new Patient();
    p.pname = this.inputName?.value;
    p.pnumber = this.inputNumber?.value;
    p.paddress = this.inputAddress?.value;
    p.healthStatus = this.inputHealthStatus?.value;
    p.fundingNeeded = this.inputAmountNeeded?.value;

    //add
    if (this.btnValue == 'Add Patient') {
      this.patientService.addPatient(p).subscribe(
        data => {
          this.toastr.success("Patient Added Successfully !");
          this.router.navigate(['/patient']);
        }, error => {
          alert("There was an error: " + error.message());
        }
      );
    }

    //update
    if (this.btnValue == 'Update Patient') {
      p.id = this.patientToUpdate.id;
      this.patientService.updatePatient(p).subscribe(
        data => {
          this.toastr.success("Patient Updated Successfully !");
          this.router.navigate(['/patient']);
        },
        error => {
          this.toastr.error("Error Updating + " + error.message());
        }
      );
    }
  }

  onSubmit() {
    if (this.patientFormGroup.invalid) {
      this.patientFormGroup.markAllAsTouched();
      this.toastr.warning("Please fill the form properly!");
      return;
    }

    this.upsertProject();

    this.patientFormGroup.reset();

  }
}
