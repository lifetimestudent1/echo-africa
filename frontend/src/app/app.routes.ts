import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'guardian-select', loadComponent: () => import('./pages/guardian-select/guardian-select').then(m => m.GuardianSelectComponent) },
  { path: 'pillar/:id', loadComponent: () => import('./pages/pillar/pillar').then(m => m.PillarComponent) },
  { path: 'sparring/:pillarId/:missionId', loadComponent: () => import('./pages/sparring/sparring').then(m => m.SparringComponent) },
  { path: 'growth-chart', loadComponent: () => import('./pages/growth-chart/growth-chart').then(m => m.GrowthChartComponent) },
  { path: 'assessment', loadComponent: () => import('./pages/assessment/assessment').then(m => m.AssessmentComponent) },
  { path: 'daily-gym', loadComponent: () => import('./pages/daily-gym/daily-gym').then(m => m.DailyGymComponent) },
  { path: 'offline-missions', loadComponent: () => import('./pages/offline-missions/offline-missions').then(m => m.OfflineMissionsComponent) },
  { path: 'certificates', loadComponent: () => import('./pages/certificates/certificates').then(m => m.CertificatesComponent) },
  { path: 'settings', loadComponent: () => import('./pages/settings/settings').then(m => m.SettingsComponent) },
  { path: '**', redirectTo: '' },
];
