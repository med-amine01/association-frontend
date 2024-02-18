import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Patient} from '../common/patient';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private PATIENT_API_URL: string = environment.API_BASE_URL + '/api/patient';

  constructor(private httpClient: HttpClient) {
  }

  addPatient(patient: Patient): Observable<any> {
    return this.httpClient.post<Patient>(this.PATIENT_API_URL + "/add", patient);
  }

  updatePatient(patient: Patient) {
    return this.httpClient.patch<Patient>(this.PATIENT_API_URL + "/update", patient);
  }

  deletePatient(id: number) {
    return this.httpClient.delete<Patient>(this.PATIENT_API_URL + "/delete/" + id);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<any>(this.PATIENT_API_URL + "/getall");
  }

  getPatient(id: number): Observable<Patient> {
    return this.httpClient.get<Patient>(this.PATIENT_API_URL + "/" + id);
  }

}

interface GetPatients {
  _embedded: {
    patients: Patient[];
  }
}
