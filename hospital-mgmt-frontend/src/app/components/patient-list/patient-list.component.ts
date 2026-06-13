import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatTableModule, MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatSortModule, MatPaginatorModule,
    MatTooltipModule,
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Patients</h1>
        <p class="page-subtitle">View and manage patient records</p>
      </div>
      <button mat-raised-button color="primary" routerLink="/patients/register">
        <mat-icon>how_to_reg</mat-icon> Register Patient
      </button>
    </div>

    <mat-card class="search-card">
      <mat-card-content>
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search patients</mat-label>
          <mat-icon matPrefix>search</mat-icon>
          <input matInput (keyup)="applyFilter($event)" placeholder="Name, issue, doctor…" />
        </mat-form-field>
      </mat-card-content>
    </mat-card>

    <mat-card class="table-card">
      <div *ngIf="loading" class="loading-center"><mat-spinner diameter="40"></mat-spinner></div>

      <div *ngIf="!loading" class="table-wrap">
        <table mat-table [dataSource]="dataSource" matSort class="full-width">

          <ng-container matColumnDef="patientId">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>#</th>
            <td mat-cell *matCellDef="let p">{{ p.patientId }}</td>
          </ng-container>

          <ng-container matColumnDef="patientName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Patient</th>
            <td mat-cell *matCellDef="let p">
              <div class="name-cell">
                <div class="avatar patient-avatar">{{ p.patientName ? p.patientName[0] : '?' }}</div>
                <div>
                  <div class="name">{{ p.patientName }}</div>
                  <div class="sub">Age {{ p.patientAge }}</div>
                </div>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="Issue">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Issue</th>
            <td mat-cell *matCellDef="let p">
              <span class="issue-badge" *ngIf="p.issue">{{ p.issue }}</span>
              <span class="no-data-cell" *ngIf="!p.issue">—</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="doctorName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Assigned Doctor</th>
            <td mat-cell *matCellDef="let p">
              <div *ngIf="p.doctorName">
                <div class="name">{{ p.doctorName }}</div>
                <div class="sub">{{ p.doctorSpec }} · {{ p.doctorExp }} yrs</div>
              </div>
              <span *ngIf="!p.doctorName" class="no-doctor">Unassigned</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="patientAddress">
            <th mat-header-cell *matHeaderCellDef>Address</th>
            <td mat-cell *matCellDef="let p" class="address-cell">{{ p.patientAddress }}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let p">
              <button mat-icon-button color="warn"
                      (click)="confirmDelete(p); $event.stopPropagation()"
                      matTooltip="Delete patient">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"
              class="table-row"
              (click)="selectPatient(row)"></tr>

          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell no-data" [attr.colspan]="displayedColumns.length">
              <mat-icon>search_off</mat-icon>
              <span>No patients found.</span>
            </td>
          </tr>
        </table>
        <mat-paginator [pageSizeOptions]="[10, 25, 50]" showFirstLastButtons></mat-paginator>
      </div>
    </mat-card>

    <!-- ── Detail popup ── -->
    <div class="detail-overlay" *ngIf="selectedPatient" (click)="selectedPatient = null">
      <div class="detail-popup" (click)="$event.stopPropagation()">
        <button class="popup-close" mat-icon-button (click)="selectedPatient = null">
          <mat-icon>close</mat-icon>
        </button>

        <div class="popup-header">
          <div class="popup-avatar">{{ selectedPatient.patientName ? selectedPatient.patientName[0] : '?' }}</div>
          <div>
            <div class="popup-name">{{ selectedPatient.patientName }}</div>
            <div class="popup-id">Patient #{{ selectedPatient.patientId }}</div>
          </div>
        </div>

        <div class="popup-body">
          <div class="popup-row">
            <mat-icon class="popup-icon">cake</mat-icon>
            <div>
              <div class="popup-label">Age</div>
              <div class="popup-value">{{ selectedPatient.patientAge }} years</div>
            </div>
          </div>

          <div class="popup-row">
            <mat-icon class="popup-icon">location_on</mat-icon>
            <div>
              <div class="popup-label">Address</div>
              <div class="popup-value">{{ selectedPatient.patientAddress }}</div>
            </div>
          </div>

          <div class="popup-row">
            <mat-icon class="popup-icon">healing</mat-icon>
            <div>
              <div class="popup-label">Medical Issue</div>
              <div class="popup-value issue-text">{{ selectedPatient.issue || '—' }}</div>
            </div>
          </div>

          <div class="popup-divider"></div>

          <div class="popup-section-label">Assigned Doctor</div>

          <div class="popup-row" *ngIf="selectedPatient.doctorName">
            <mat-icon class="popup-icon doctor-icon">medical_services</mat-icon>
            <div>
              <div class="popup-value">{{ selectedPatient.doctorName }}</div>
              <div class="popup-label">{{ selectedPatient.doctorSpec }} · {{ selectedPatient.doctorExp }} yrs exp</div>
            </div>
          </div>
          <div *ngIf="!selectedPatient.doctorName" class="no-doctor">No doctor assigned</div>
        </div>

        <div class="popup-footer">
          <button mat-stroked-button color="warn"
                  (click)="confirmDelete(selectedPatient!); selectedPatient = null">
            <mat-icon>delete</mat-icon> Delete
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
    }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #0d1b2a; margin: 0 0 4px; }
    .page-subtitle { color: #607d8b; margin: 0; }

    .search-card { border-radius: 12px !important; margin-bottom: 20px; }
    .search-card mat-card-content { padding: 16px 16px 0 !important; }
    .search-field { width: 100%; max-width: 420px; }

    .table-card { border-radius: 12px !important; overflow: hidden; }
    .loading-center { display: flex; justify-content: center; padding: 40px; }
    .table-wrap { overflow-x: auto; }
    .full-width { width: 100%; }

    .name-cell { display: flex; align-items: center; gap: 10px; }
    .avatar {
      width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 0.9rem; color: #fff; flex-shrink: 0;
    }
    .patient-avatar { background: linear-gradient(135deg, #00695c, #26a69a); }
    .name { font-weight: 600; color: #0d1b2a; font-size: 0.9rem; }
    .sub { font-size: 0.78rem; color: #90a4ae; }

    .issue-badge {
      background: #fff3e0; color: #e65100;
      padding: 3px 10px; border-radius: 12px;
      font-size: 0.8rem; font-weight: 600;
    }
    .no-data-cell { color: #b0bec5; }
    .no-doctor { color: #b0bec5; font-style: italic; font-size: 0.85rem; }
    .address-cell { max-width: 160px; font-size: 0.85rem; color: #607d8b; }

    .table-row { cursor: pointer; transition: background 0.1s; }
    .table-row:hover { background: #f5fffe; }

    th { font-weight: 700 !important; color: #37474f !important; font-size: 0.82rem !important;
         text-transform: uppercase; letter-spacing: 0.5px; }

    .no-data {
      text-align: center; padding: 40px !important;
      color: #90a4ae; display: flex; align-items: center; justify-content: center; gap: 8px;
    }

    /* ── Detail Popup ── */
    .detail-overlay {
      position: fixed; inset: 0;
      background: rgba(10, 22, 40, 0.45);
      backdrop-filter: blur(2px);
      z-index: 1000;
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn 0.15s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .detail-popup {
      background: #fff;
      border-radius: 16px;
      width: 340px;
      max-width: 92vw;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      animation: slideUp 0.18s ease;
      position: relative;
      overflow: hidden;
    }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    .popup-close {
      position: absolute; top: 10px; right: 10px;
      color: #90a4ae; z-index: 1;
    }

    .popup-header {
      display: flex; align-items: center; gap: 14px;
      padding: 24px 20px 16px;
      background: linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%);
    }
    .popup-avatar {
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg, #00695c, #26a69a);
      color: #fff; font-size: 1.2rem; font-weight: 800;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; border: 2px solid rgba(255,255,255,0.2);
    }
    .popup-name { font-size: 1rem; font-weight: 700; color: #fff; }
    .popup-id { font-size: 0.75rem; color: #4fc3f7; margin-top: 2px; }

    .popup-body { padding: 16px 20px; }

    .popup-row {
      display: flex; align-items: flex-start; gap: 12px;
      margin-bottom: 14px;
    }
    .popup-icon {
      font-size: 18px; width: 18px; height: 18px;
      color: #90a4ae; margin-top: 2px; flex-shrink: 0;
    }
    .doctor-icon { color: #1565c0 !important; }
    .popup-label { font-size: 0.72rem; color: #90a4ae; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .popup-value { font-size: 0.9rem; color: #0d1b2a; font-weight: 600; margin-bottom: 2px; }
    .issue-text { color: #e65100; }

    .popup-divider { height: 1px; background: #eef2f7; margin: 8px 0 14px; }
    .popup-section-label {
      font-size: 0.68rem; font-weight: 700;
      letter-spacing: 1.2px; text-transform: uppercase;
      color: #90a4ae; margin-bottom: 10px;
    }

    .popup-footer {
      padding: 12px 20px 16px;
      display: flex; justify-content: flex-end;
      border-top: 1px solid #eef2f7;
    }
  `]
})
export class PatientListComponent implements OnInit {
  displayedColumns = ['patientId', 'patientName', 'Issue', 'doctorName', 'patientAddress', 'actions'];
  dataSource = new MatTableDataSource<Patient>([]);
  loading = true;
  selectedPatient: Patient | null = null;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private patientSvc: PatientService, private snack: MatSnackBar) {}

  ngOnInit(): void { this.load(); }

 ngAfterViewInit(): void {}

  load(): void {
    this.loading = true;
    this.patientSvc.getAllPatients().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.loading = false;
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
  }

  confirmDelete(patient: Patient): void {
    const confirmed = window.confirm(`Delete patient "${patient.patientName}"? This cannot be undone.`);
    if (!confirmed) return;
    this.patientSvc.deletePatient(patient.patientId!).subscribe({
      next: msg => {
        this.snack.open(msg || 'Patient deleted.', 'Close', { duration: 3000, panelClass: 'snack-success' });
        this.load();
      },
      error: () => this.snack.open('Failed to delete patient.', 'Close', { duration: 3000 })
    });
  }
}