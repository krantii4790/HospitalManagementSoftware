import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./components/doctor-list/doctor-list.component').then(m => m.DoctorListComponent),
  },
  {
    path: 'doctors/add',
    loadComponent: () =>
      import('./components/add-doctor/add-doctor.component').then(m => m.AddDoctorComponent),
  },
  {
    path: 'patients',
    loadComponent: () =>
      import('./components/patient-list/patient-list.component').then(m => m.PatientListComponent),
  },
  {
    path: 'patients/register',
    loadComponent: () =>
      import('./components/register-patient/register-patient.component').then(m => m.RegisterPatientComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];