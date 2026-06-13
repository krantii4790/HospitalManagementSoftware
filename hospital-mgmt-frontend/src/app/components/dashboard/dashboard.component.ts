import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Welcome to MediCare Hospital Management System</p>
    </div>

    <div *ngIf="loading" class="loading-center">
      <mat-spinner diameter="48"></mat-spinner>
    </div>

    <div *ngIf="!loading" class="stats-grid">
      <mat-card class="stat-card doctors-card">
        <mat-card-content>
          <div class="stat-icon-wrap doctors-icon">
            <mat-icon>medical_services</mat-icon>
          </div>
          <div class="stat-info">
            <span class="stat-number">{{ totalDoctors }}</span>
            <span class="stat-label">Total Doctors</span>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/doctors" color="primary">View All →</button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="stat-card patients-card">
        <mat-card-content>
          <div class="stat-icon-wrap patients-icon">
            <mat-icon>personal_injury</mat-icon>
          </div>
          <div class="stat-info">
            <span class="stat-number">{{ totalPatients }}</span>
            <span class="stat-label">Total Patients</span>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/patients" color="primary">View All →</button>
        </mat-card-actions>
      </mat-card>
    </div>

    <div *ngIf="!loading" class="quick-actions">
      <h2 class="section-title">Quick Actions</h2>
      <div class="actions-grid">
        <mat-card class="action-card" routerLink="/doctors/add">
          <mat-card-content>
            <mat-icon class="action-icon">person_add</mat-icon>
            <span>Add New Doctor</span>
          </mat-card-content>
        </mat-card>
        <mat-card class="action-card" routerLink="/patients/register">
          <mat-card-content>
            <mat-icon class="action-icon">how_to_reg</mat-icon>
            <span>Register Patient</span>
          </mat-card-content>
        </mat-card>
        <mat-card class="action-card" routerLink="/doctors">
          <mat-card-content>
            <mat-icon class="action-icon">search</mat-icon>
            <span>Find by Specialization</span>
          </mat-card-content>
        </mat-card>
        <mat-card class="action-card" routerLink="/patients">
          <mat-card-content>
            <mat-icon class="action-icon">list_alt</mat-icon>
            <span>Patient Records</span>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 28px; }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #0d1b2a; margin: 0 0 4px; }
    .page-subtitle { color: #607d8b; margin: 0; }

    .loading-center { display: flex; justify-content: center; padding: 60px 0; }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card { border-radius: 12px !important; box-shadow: 0 2px 12px rgba(0,0,0,0.08) !important; }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 24px 24px 8px !important;
    }

    .stat-icon-wrap {
      width: 56px; height: 56px; border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .stat-icon-wrap mat-icon { font-size: 28px; width: 28px; height: 28px; color: #fff; }
    .doctors-icon { background: linear-gradient(135deg, #1565c0, #42a5f5); }
    .patients-icon { background: linear-gradient(135deg, #00695c, #26a69a); }

    .stat-info { display: flex; flex-direction: column; }
    .stat-number { font-size: 2.2rem; font-weight: 800; color: #0d1b2a; line-height: 1; }
    .stat-label { font-size: 0.85rem; color: #607d8b; margin-top: 4px; font-weight: 500; }

    .section-title { font-size: 1.1rem; font-weight: 700; color: #0d1b2a; margin: 0 0 16px; }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
    }

    .action-card {
      border-radius: 12px !important;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
    }
    .action-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.12) !important; }

    .action-card mat-card-content {
      display: flex; flex-direction: column; align-items: center;
      gap: 12px; padding: 24px 16px !important; text-align: center;
      font-weight: 600; color: #37474f;
    }

    .action-icon { font-size: 36px; width: 36px; height: 36px; color: #1565c0; }
  `]
})
export class DashboardComponent implements OnInit {
  totalDoctors = 0;
  totalPatients = 0;
  loading = true;

  constructor(private doctorSvc: DoctorService, private patientSvc: PatientService) {}

  ngOnInit(): void {
    forkJoin({
      doctors: this.doctorSvc.getAllDoctors(),
      patients: this.patientSvc.getAllPatients(),
    }).subscribe({
      next: ({ doctors, patients }) => {
        this.totalDoctors = doctors.length;
        this.totalPatients = patients.length;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}