import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

const SPECIALIZATIONS = [
  'Cardio', 'Neurology', 'Ortho', 'Dermatology',
  'Pediatrics', 'Oncology', 'Radiology', 'General'
];

@Component({
  selector: 'app-register-patient',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule,
    MatDividerModule,
  ],
  template: `
    <div class="page-header">
      <button mat-icon-button routerLink="/patients" class="back-btn">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <div>
        <h1 class="page-title">Register New Patient</h1>
        <p class="page-subtitle">Patient will be auto-assigned to an available doctor</p>
      </div>
    </div>

    <div class="form-layout">
      <mat-card class="form-card">
        <mat-card-content>
          <div class="section-label">
            <div class="section-icon patient-icon"><mat-icon>person</mat-icon></div>
            Personal Details
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="two-col">
              <mat-form-field appearance="outline">
                <mat-label>Full Name</mat-label>
                <mat-icon matPrefix>person</mat-icon>
                <input matInput formControlName="patientName" placeholder="Jane Doe" />
                <mat-error *ngIf="form.get('patientName')?.hasError('required')">Required</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Age</mat-label>
                <mat-icon matPrefix>cake</mat-icon>
                <input matInput type="number" formControlName="patientAge" placeholder="e.g. 34" />
                <mat-error *ngIf="form.get('patientAge')?.hasError('required')">Required</mat-error>
                <mat-error *ngIf="form.get('patientAge')?.hasError('min')">Must be > 0</mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-field">
              <mat-label>Address</mat-label>
              <mat-icon matPrefix>location_on</mat-icon>
              <input matInput formControlName="patientAddress" placeholder="123 Main St, City" />
              <mat-error *ngIf="form.get('patientAddress')?.hasError('required')">Required</mat-error>
            </mat-form-field>

            <mat-divider class="section-divider"></mat-divider>

            <div class="section-label">
              <div class="section-icon medical-icon"><mat-icon>medical_information</mat-icon></div>
              Medical Information
            </div>

            <mat-form-field appearance="outline" class="full-field">
              <mat-label>Medical Issue / Complaint</mat-label>
              <mat-icon matPrefix>healing</mat-icon>
              <textarea matInput formControlName="issue" rows="3" placeholder="Describe the patient's condition…"></textarea>
              <mat-error *ngIf="form.get('issue')?.hasError('required')">Required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-field">
              <mat-label>Required Specialization</mat-label>
              <mat-icon matPrefix>biotech</mat-icon>
              <mat-select formControlName="specialization">
                <mat-option *ngFor="let s of specializations" [value]="s">{{ s }}</mat-option>
              </mat-select>
              <mat-hint>A doctor from this specialty will be auto-assigned</mat-hint>
              <mat-error *ngIf="form.get('specialization')?.hasError('required')">Required</mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-stroked-button type="button" routerLink="/patients">Cancel</button>
              <button mat-raised-button color="primary" type="submit"
                      [disabled]="form.invalid || submitting">
                <mat-spinner diameter="18" *ngIf="submitting"></mat-spinner>
                <span *ngIf="!submitting"><mat-icon>how_to_reg</mat-icon> Register</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <div class="side-panel">
        <mat-card *ngIf="registeredPatient" class="success-card">
          <mat-card-content>
            <div class="success-header">
              <mat-icon class="success-icon">check_circle</mat-icon>
              <span>Patient Registered!</span>
            </div>
            <div class="assigned-info">
              <div class="info-row">
                <mat-icon>person</mat-icon>
                <span>{{ registeredPatient.patientName }}</span>
              </div>
              <div class="info-row" *ngIf="registeredPatient.doctorName">
                <mat-icon>medical_services</mat-icon>
                <span>{{ registeredPatient.doctorName }}</span>
              </div>
              <div class="info-row" *ngIf="registeredPatient.doctorSpec">
                <mat-icon>biotech</mat-icon>
                <span>{{ registeredPatient.doctorSpec }}</span>
              </div>
            </div>
            <button mat-stroked-button routerLink="/patients" class="view-btn">
              View All Patients →
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card class="info-card">
          <mat-card-content>
            <h3>How It Works</h3>
            <div class="step" *ngFor="let step of steps; let i = index">
              <div class="step-num">{{ i + 1 }}</div>
              <span>{{ step }}</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
    }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #0d1b2a; margin: 0 0 4px; }
    .page-subtitle { color: #607d8b; margin: 0; }

    .form-layout {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 800px) { .form-layout { grid-template-columns: 1fr; } }

    .form-card { border-radius: 12px !important; }
    .form-card mat-card-content { padding: 28px !important; }

    .section-label {
      display: flex; align-items: center; gap: 12px;
      font-size: 1rem; font-weight: 700; color: #0d1b2a;
      margin-bottom: 20px;
    }
    .section-icon {
      width: 38px; height: 38px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
    }
    .patient-icon { background: linear-gradient(135deg, #00695c, #26a69a); }
    .medical-icon { background: linear-gradient(135deg, #1565c0, #42a5f5); }
    .section-icon mat-icon { color: #fff; font-size: 20px; }

    .section-divider { margin: 24px 0 20px !important; }

    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 500px) { .two-col { grid-template-columns: 1fr; } }
    .full-field { width: 100%; }

    .form-actions {
      display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;
    }
    .form-actions button { min-width: 130px; }

    .side-panel { display: flex; flex-direction: column; gap: 16px; }

    .success-card { border-radius: 12px !important; background: #e8f5e9 !important; border-left: 4px solid #43a047 !important; }
    .success-header {
      display: flex; align-items: center; gap: 8px;
      font-weight: 700; color: #2e7d32; font-size: 1rem; margin-bottom: 16px;
    }
    .success-icon { color: #43a047; }
    .assigned-info { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
    .info-row { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: #37474f; }
    .info-row mat-icon { font-size: 18px; color: #607d8b; }
    .view-btn { width: 100%; }

    .info-card { border-radius: 12px !important; background: #e3f2fd !important; }
    .info-card mat-card-content { padding: 20px !important; }
    .info-card h3 { margin: 0 0 16px; color: #1565c0; font-size: 0.95rem; font-weight: 700; }

    .step { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 0.87rem; color: #37474f; }
    .step-num {
      width: 22px; height: 22px; border-radius: 50%;
      background: #1565c0; color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.75rem; font-weight: 700; flex-shrink: 0; margin-top: 1px;
    }
  `]
})
export class RegisterPatientComponent {
  specializations = SPECIALIZATIONS;
  submitting = false;
  registeredPatient: Patient | null = null;

  steps = [
    'Fill in patient personal details',
    'Select required specialization',
    'Backend auto-assigns an available doctor',
    'Patient record is created instantly',
  ];

  form = this.fb.group({
    patientName:    ['', Validators.required],
    patientAddress: ['', Validators.required],
    patientAge:     [null as number | null, [Validators.required, Validators.min(1)]],
    issue:          ['', Validators.required],
    specialization: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private patientSvc: PatientService,
    private snack: MatSnackBar,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    const val = this.form.value;
    this.patientSvc.registerPatient(val.specialization!, {
  patientName:    val.patientName!,
  patientAddress: val.patientAddress!,
  patientAge:     val.patientAge!,
  issue:          val.issue!,    // capital I
}).subscribe({
      next: patient => {
        this.registeredPatient = patient;
        this.snack.open('Patient registered successfully!', 'Close', { duration: 3000, panelClass: 'snack-success' });
        this.form.reset();
        this.submitting = false;
      },
      error: () => {
        this.snack.open('Registration failed. Check backend.', 'Close', { duration: 4000 });
        this.submitting = false;
      }
    });
  }
}