import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule,
    MatIconModule, MatButtonModule, MatTooltipModule,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">

        <!-- Brand -->
        <div class="brand">
          <div class="brand-logo">
            <mat-icon>local_hospital</mat-icon>
          </div>
          <div class="brand-text">
            <span class="brand-name">MediCare</span>
            <span class="brand-sub">HMS Portal</span>
          </div>
        </div>

        <!-- Nav -->
        <nav class="nav-menu">
          <div class="nav-group">
            <span class="nav-group-label">OVERVIEW</span>
            <a class="nav-item" routerLink="/dashboard" routerLinkActive="nav-item--active">
              <div class="nav-icon-wrap"><mat-icon>dashboard</mat-icon></div>
              <span>Dashboard</span>
            </a>
          </div>

          <div class="nav-group">
            <span class="nav-group-label">DOCTORS</span>
            <a class="nav-item" routerLink="/doctors" routerLinkActive="nav-item--active"
               [routerLinkActiveOptions]="{exact:true}">
              <div class="nav-icon-wrap"><mat-icon>people</mat-icon></div>
              <span>All Doctors</span>
            </a>
            <a class="nav-item" routerLink="/doctors/add" routerLinkActive="nav-item--active">
              <div class="nav-icon-wrap"><mat-icon>person_add</mat-icon></div>
              <span>Add Doctor</span>
            </a>
          </div>

          <div class="nav-group">
            <span class="nav-group-label">PATIENTS</span>
            <a class="nav-item" routerLink="/patients" routerLinkActive="nav-item--active"
               [routerLinkActiveOptions]="{exact:true}">
              <div class="nav-icon-wrap"><mat-icon>personal_injury</mat-icon></div>
              <span>All Patients</span>
            </a>
            <a class="nav-item" routerLink="/patients/register" routerLinkActive="nav-item--active">
              <div class="nav-icon-wrap"><mat-icon>how_to_reg</mat-icon></div>
              <span>Register Patient</span>
            </a>
          </div>
        </nav>

        <!-- Bottom user badge -->
        <!-- <div class="sidenav-footer">
          <div class="user-badge">
            <div class="user-avatar">A</div>
            <div class="user-info">
              <span class="user-name">Admin</span>
              <span class="user-role">Hospital Staff</span>
            </div>
            <mat-icon class="user-status">circle</mat-icon>
          </div>
        </div> -->
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <mat-toolbar class="top-toolbar">
          <button mat-icon-button (click)="sidenav.toggle()" class="menu-btn">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="toolbar-title">Hospital Management System</span>
          <span class="spacer"></span>
          <!-- <div class="toolbar-right">
            <div class="notif-dot"></div>
            <mat-icon class="toolbar-avatar-icon">account_circle</mat-icon>
          </div> -->
        </mat-toolbar>
        <div class="content-area">
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    /* ── Layout ── */
    .sidenav-container { height: 100vh; }

    /* ── Sidenav ── */
    .sidenav {
      width: 248px;
      background: #0a1628;
      border-right: none !important;
      display: flex;
      flex-direction: column;
    }

    /* ── Brand ── */
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 22px 20px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .brand-logo {
      width: 38px; height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #2979ff, #00b0ff);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .brand-logo mat-icon { color: #fff; font-size: 22px; }
    .brand-text { display: flex; flex-direction: column; }
    .brand-name { font-size: 1rem; font-weight: 800; color: #fff; letter-spacing: 0.3px; line-height: 1.2; }
    .brand-sub { font-size: 0.68rem; color: #4fc3f7; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; }

    /* ── Nav groups ── */
    .nav-menu { flex: 1; padding: 12px 12px 0; overflow-y: auto; }
    .nav-group { margin-bottom: 8px; }
    .nav-group-label {
      display: block;
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 1.8px;
      color: #37517a;
      padding: 10px 10px 6px;
    }

    /* ── Nav items ── */
    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 8px;
      margin-bottom: 2px;
      text-decoration: none;
      color: #7a93b8;
      font-size: 0.88rem;
      font-weight: 500;
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .nav-item:hover {
      background: rgba(41,121,255,0.08);
      color: #c8d8f0;
    }
    .nav-item:hover .nav-icon-wrap { background: rgba(41,121,255,0.15); }
    .nav-item:hover .nav-icon-wrap mat-icon { color: #4fc3f7; }

    .nav-item--active {
      background: rgba(41,121,255,0.12) !important;
      color: #fff !important;
    }
    .nav-item--active .nav-icon-wrap {
      background: linear-gradient(135deg, #2979ff, #00b0ff) !important;
    }
    .nav-item--active .nav-icon-wrap mat-icon { color: #fff !important; }

    .nav-icon-wrap {
      width: 32px; height: 32px;
      border-radius: 8px;
      background: rgba(255,255,255,0.04);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    .nav-icon-wrap mat-icon {
      font-size: 18px; width: 18px; height: 18px;
      color: #4a6080;
    }

    /* ── Footer ── */
    .sidenav-footer {
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.06);
      margin-top: auto;
    }
    .user-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 8px;
      background: rgba(255,255,255,0.04);
    }
    .user-avatar {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2979ff, #00b0ff);
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
    }
    .user-info { display: flex; flex-direction: column; flex: 1; }
    .user-name { font-size: 0.82rem; font-weight: 600; color: #c8d8f0; line-height: 1.2; }
    .user-role { font-size: 0.7rem; color: #4a6080; }
    .user-status { font-size: 10px !important; width: 10px !important; height: 10px !important; color: #00e676; }

    /* ── Toolbar ── */
    .top-toolbar {
      background: #fff !important;
      border-bottom: 1px solid #e8edf3;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      color: #0d1b2a;
      position: sticky; top: 0; z-index: 100;
      height: 60px;
    }
    .menu-btn { color: #607d8b; margin-right: 4px; }
    .toolbar-title { font-size: 0.95rem; font-weight: 700; color: #0d1b2a; letter-spacing: 0.2px; }
    .spacer { flex: 1; }
    .toolbar-right { display: flex; align-items: center; gap: 4px; position: relative; }
    .notif-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #f44336;
      position: absolute; top: 2px; right: 2px;
      border: 2px solid #fff;
    }
    .toolbar-avatar-icon { color: #78909c; font-size: 32px !important; width: 32px !important; height: 32px !important; }

    /* ── Content ── */
    .main-content { background: #f0f4f8; }
    .content-area { padding: 24px; min-height: calc(100vh - 60px); }
  `]
})
export class AppComponent {}