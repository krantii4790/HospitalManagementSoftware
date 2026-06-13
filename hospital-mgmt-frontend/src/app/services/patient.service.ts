import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private base = 'http://localhost:5050/patientapi';

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.base}/allPatients`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.base}/patient/${id}`);
  }

  registerPatient(spec: string, patient: Omit<Patient, 'patientId' | 'doctorName' | 'doctorSpec' | 'doctorExp'>): Observable<Patient> {
    return this.http.post<Patient>(`${this.base}/registerPatient/${spec}`, patient);
  }

  deletePatient(id: number): Observable<string> {
    return this.http.delete(`${this.base}/deletePatient/${id}`, { responseType: 'text' });
  }
}