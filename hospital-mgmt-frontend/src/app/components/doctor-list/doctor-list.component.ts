import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';

const SPECIALIZATIONS = [
  'Cardio', 'Neurology', 'Ortho', 'Dermatology',
  'Pediatrics', 'Oncology', 'Radiology', 'General'
];

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatTableModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatChipsModule,
    MatProgressSpinnerModule, MatSortModule, MatPaginatorModule,
    MatTooltipModule, MatSnackBarModule,
  ],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Doctors</h1>
        <p class="page-subtitle">Manage hospital medical staff</p>
      </div>
      <button mat-raised-button color="primary" routerLink="/doctors/add">
        <mat-icon>person_add</mat-icon> Add Doctor
      </button>
    </div>

    <mat-card class="filter-card">
      <mat-card-content>
        <div class="filter-row">
          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Filter by Specialization</mat-label>
            <mat-select [(ngModel)]="selectedSpec" (ngModelChange)="onSpecChange($event)">
              <mat-option value="">All Specializations</mat-option>
              <mat-option *ngFor="let s of specializations" [value]="s">{{ s }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Search doctors</mat-label>
            <mat-icon matPrefix>search</mat-icon>
            <input matInput (keyup)="applyTextFilter($event)" placeholder="Name, specialization…" />
          </mat-form-field>

          <button mat-stroked-button (click)="clearFilters()" *ngIf="selectedSpec">
            <mat-icon>clear</mat-icon> Clear Filter
          </button>
        </div>
      </mat-card-content>
    </mat-card>

    <mat-card class="table-card">
      <div *ngIf="loading" class="loading-center"><mat-spinner diameter="40"></mat-spinner></div>

      <div *ngIf="!loading" class="table-wrap">
        <table mat-table [dataSource]="dataSource" matSort class="full-width">
          <ng-container matColumnDef="doctorId">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>#</th>
            <td mat-cell *matCellDef="let d">{{ d.doctorId }}</td>
          </ng-container>

          <ng-container matColumnDef="doctorName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let d">
              <div class="doctor-name-cell"
                   [matTooltip]="'Dr. ' + d.doctorName + ' — ' + d.doctorSpec + ', ' + d.doctorExp + ' yrs experience'"
                   matTooltipPosition="right">
                <div class="avatar">{{ d.doctorName ? d.doctorName[0] : '?' }}</div>
                <span>{{ d.doctorName }}</span>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="doctorSpec">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Specialization</th>
            <td mat-cell *matCellDef="let d">
              <span class="spec-chip">{{ d.doctorSpec }}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="doctorExp">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Experience</th>
            <td mat-cell *matCellDef="let d">{{ d.doctorExp }} yrs</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let d">
              <button mat-icon-button color="warn"
                      (click)="confirmDelete(d)"
                      matTooltip="Delete doctor">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>

          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell no-data" [attr.colspan]="displayedColumns.length">
              <mat-icon>search_off</mat-icon>
              <span>No doctors found.</span>
            </td>
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[10, 25, 50]" showFirstLastButtons></mat-paginator>
      </div>
    </mat-card>
  `,
  styles: [`
    .page-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
    }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #0d1b2a; margin: 0 0 4px; }
    .page-subtitle { color: #607d8b; margin: 0; }

    .filter-card { border-radius: 12px !important; margin-bottom: 20px; }
    .filter-row { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; padding: 8px 0 0; }
    .filter-field { flex: 1; min-width: 200px; }

    .table-card { border-radius: 12px !important; overflow: hidden; }
    .loading-center { display: flex; justify-content: center; padding: 40px; }
    .table-wrap { overflow-x: auto; }
    .full-width { width: 100%; }

    .doctor-name-cell { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: linear-gradient(135deg, #1565c0, #42a5f5);
      color: #fff; display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 0.9rem; flex-shrink: 0;
    }

    .spec-chip {
      background: #e3f2fd; color: #1565c0;
      padding: 3px 10px; border-radius: 12px;
      font-size: 0.8rem; font-weight: 600;
    }

    .table-row:hover { background: #f5f9ff; }

    th { font-weight: 700 !important; color: #37474f !important; font-size: 0.82rem !important; text-transform: uppercase; letter-spacing: 0.5px; }

    .no-data {
      text-align: center; padding: 40px !important;
      color: #90a4ae; display: flex; align-items: center; justify-content: center; gap: 8px;
    }
  `]
})
export class DoctorListComponent implements OnInit {
  displayedColumns = ['doctorId', 'doctorName', 'doctorSpec', 'doctorExp', 'actions'];
  dataSource = new MatTableDataSource<Doctor>([]);
  specializations = SPECIALIZATIONS;
  selectedSpec = '';
  loading = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private doctorSvc: DoctorService, private snack: MatSnackBar) {}

  ngOnInit(): void { this.loadAll(); }

ngAfterViewInit(): void {}

  private attachTableControls(): void {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadAll(): void {
    this.loading = true;
    this.doctorSvc.getAllDoctors().subscribe({
      next: data => { this.dataSource.data = data; this.loading = false; this.attachTableControls(); },
      error: () => { this.loading = false; }
    });
  }

  onSpecChange(spec: string): void {
    if (!spec) { this.loadAll(); return; }
    this.loading = true;
    this.doctorSvc.getDoctorsBySpec(spec).subscribe({
      next: data => { this.dataSource.data = data; this.loading = false; this.attachTableControls(); },
      error: () => { this.loading = false; }
    });
  }

  applyTextFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  clearFilters(): void {
    this.selectedSpec = '';
    this.loadAll();
  }

  confirmDelete(doctor: Doctor): void {
    const confirmed = window.confirm(`Delete Dr. ${doctor.doctorName}? This cannot be undone.`);
    if (!confirmed) return;
    this.doctorSvc.deleteDoctor(doctor.doctorId!).subscribe({
      next: msg => {
        this.snack.open(msg || 'Doctor deleted.', 'Close', { duration: 3000, panelClass: 'snack-success' });
        this.loadAll();
      },
      error: () => this.snack.open('Failed to delete doctor.', 'Close', { duration: 3000 })
    });
  }
}