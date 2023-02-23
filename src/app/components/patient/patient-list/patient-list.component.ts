import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/common/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit{
  patients : Patient[] = [];
  id !: number;
  constructor(
    private patientService : PatientService,
    private toastr: ToastrService,
    private location : Location
  ){}

  ngOnInit(): void {
    this.listPatient();
  }

  setIdForModel(id : number){
    this.id = id;
  }

  listPatient(){
    this.patientService.getAllPatients().subscribe(
      data => {
        this.patients = data;
      }
    );
  }

  deletePatient(){
    this.patientService.deletePatient(this.id).subscribe(
      data => {
          this.toastr.success("Patient with ID = " + this.id + " Deleted Successfully");
          this.location.go(this.location.path());
          window.location.reload();
      },
      error => {
        console.log(error.message());
      }
    )
  }

}
