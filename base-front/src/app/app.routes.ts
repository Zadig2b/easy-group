import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { ContactComponent } from './pages/contact/contact.component';
import { MentionsLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateListComponent } from './pages/lists/create-list/create-list.component';
import { ListComponent } from './pages/lists/view-list/view-list.component';
import { ConditionsUtilisationComponent } from './pages/cgu/conditions-utilisation.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mentions-legales', component: MentionsLegalesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lists/create', component: CreateListComponent },
  { path: 'cgu', component: ConditionsUtilisationComponent },
  { path: 'lists/:listId', component: ListComponent },
  { path: '**', redirectTo: '' },
];
