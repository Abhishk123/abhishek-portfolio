import { Routes } from '@angular/router';
import { Portfolio } from './components/portfolio/portfolio';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  { path: '', component: Portfolio },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' }
];
