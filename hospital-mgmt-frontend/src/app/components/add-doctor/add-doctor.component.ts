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
import { DoctorService } from '../../services/doctor.service';

const SPECIALIZATIONS = [
  'Cardio', 'Neurology', 'Ortho', 'Dermatology',
  'Pediatrics', 'Oncology', 'Radiology', 'General','forensic'
];

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule,
  ],
  template: `
    <div class="page-header">
      <button mat-icon-button routerLink="/doctors" class="back-btn">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <div>
        <h1 class="page-title">Add New Doctor</h1>
        <p class="page-subtitle">Register a new medical professional</p>
      </div>
    </div>

    <div class="form-layout">
      <mat-card class="form-card">
        <mat-card-content>
          <div class="form-icon-header">
            <div class="form-avatar"><mat-icon>medical_services</mat-icon></div>
            <span>Doctor Information</span>
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="doctor-form">
            <mat-form-field appearance="outline" class="full-field">
              <mat-label>Doctor's Full Name</mat-label>
              <mat-icon matPrefix>person</mat-icon>
              <input matInput formControlName="doctorName" placeholder="Dr. John Smith" />
              <mat-error *ngIf="form.get('doctorName')?.hasError('required')">Name is required</mat-error>
              <mat-error *ngIf="form.get('doctorName')?.hasError('minlength')">Minimum 3 characters</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-field">
              <mat-label>Specialization</mat-label>
              <mat-icon matPrefix>biotech</mat-icon>
              <mat-select formControlName="doctorSpec">
                <mat-option *ngFor="let s of specializations" [value]="s">{{ s }}</mat-option>
              </mat-select>
              <mat-error *ngIf="form.get('doctorSpec')?.hasError('required')">Specialization is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-field">
              <mat-label>Years of Experience</mat-label>
              <mat-icon matPrefix>workspace_premium</mat-icon>
              <input matInput type="number" formControlName="doctorExp" placeholder="e.g. 5" />
              <mat-error *ngIf="form.get('doctorExp')?.hasError('required')">Experience is required</mat-error>
              <mat-error *ngIf="form.get('doctorExp')?.hasError('min')">Must be at least 0</mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-stroked-button type="button" routerLink="/doctors">Cancel</button>
              <button mat-raised-button color="primary" type="submit"
                      [disabled]="form.invalid || submitting">
                <mat-spinner diameter="18" *ngIf="submitting"></mat-spinner>
                <span *ngIf="!submitting"><mat-icon>save</mat-icon> Save Doctor</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="info-card">
        <mat-card-content>
          <h3>Tips</h3>
          <ul class="tips-list">
            <li><mat-icon class="tip-icon">info</mat-icon> Name will be used for patient assignment</li>
            <li><mat-icon class="tip-icon">info</mat-icon> Patients are auto-assigned by specialization</li>
            <li><mat-icon class="tip-icon">info</mat-icon> Experience in completed years</li>
          </ul>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
    }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #0d1b2a; margin: 0 0 4px; }
    .page-subtitle { color: #607d8b; margin: 0; }
    .back-btn { color: #607d8b; }

    .form-layout {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 800px) { .form-layout { grid-template-columns: 1fr; } }

    .form-card { border-radius: 12px !important; }
    .form-card mat-card-content { padding: 28px !important; }

    .form-icon-header {
      display: flex; align-items: center; gap: 14px;
      font-size: 1.1rem; font-weight: 700; color: #0d1b2a;
      margin-bottom: 28px;
    }
    .form-avatar {
      width: 44px; height: 44px; border-radius: 12px;
      background: linear-gradient(135deg, #1565c0, #42a5f5);
      display: flex; align-items: center; justify-content: center;
    }
    .form-avatar mat-icon { color: #fff; }

    .doctor-form { display: flex; flex-direction: column; gap: 4px; }
    .full-field { width: 100%; }

    .form-actions {
      display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px;
    }
    .form-actions button { min-width: 130px; }

    .info-card { border-radius: 12px !important; background: #e8f4fd !important; }
    .info-card h3 { margin: 0 0 16px; color: #1565c0; font-size: 0.95rem; font-weight: 700; }

    .tips-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
    .tips-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 0.88rem; color: #37474f; }
    .tip-icon { font-size: 18px; color: #1565c0; flex-shrink: 0; margin-top: 1px; }
  `]
})
export class AddDoctorComponent {
  specializations = SPECIALIZATIONS;
  submitting = false;

  form = this.fb.group({
    doctorName: ['', [Validators.required, Validators.minLength(3)]],
    doctorSpec:  ['', Validators.required],
    doctorExp:   [null as number | null, [Validators.required, Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private doctorSvc: DoctorService,
    private router: Router,
    private snack: MatSnackBar,
  ) {}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    const val = this.form.value;
    this.doctorSvc.saveDoctor({
      doctorName: val.doctorName!,
      doctorSpec:  val.doctorSpec!,
      doctorExp:   val.doctorExp!,
    }).subscribe({
      next: () => {
        this.snack.open('Doctor saved successfully!', 'Close', { duration: 3000, panelClass: 'snack-success' });
        this.router.navigate(['/doctors']);
      },
      error: () => {
        this.snack.open('Failed to save doctor. Check backend connection.', 'Close', { duration: 4000 });
        this.submitting = false;
      }
    });
  }
}