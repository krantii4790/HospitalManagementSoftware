import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private base = 'http://localhost:7070/doctorapi';

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.base}/allDoctors`);
  }

  saveDoctor(doctor: Omit<Doctor, 'id'>): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.base}/saveDoctor`, doctor);
  }

  getDoctorsBySpec(spec: string): Observable<Doctor[]> {
  return this.http.get<Doctor[]>(`${this.base}/fetchDoctor/${spec}`);
}

deleteDoctor(id: number): Observable<string> {
  return this.http.delete(`${this.base}/deleteDoctor/${id}`, { responseType: 'text' });
}
}