import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { ContactComponent } from './pages/contact/contact.component';
import { MentionsLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateListComponent } from './pages/lists/create-list/create-list.component';
import { ListComponent } from './pages/lists/view-list/view-list.component';
import { ConditionsUtilisationComponent } from './pages/cgu/conditions-utilisation.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mentions-legales', component: MentionsLegalesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lists/create', component: CreateListComponent },
  { path: 'cgu', component: ConditionsUtilisationComponent },

    // 🔽 Routes pour les personnes
  {
    path: 'lists/:listId/persons',
    loadComponent: () =>
      import('./pages/lists/persons/person-list/person-list.component').then(
        (m) => m.PersonListComponent
      ),
  },
  {
    path: 'lists/:listId/persons/add',
    loadComponent: () =>
      import('./pages/lists/persons/person-form/person-form.component').then(
        (m) => m.PersonFormComponent
      ),
  },

  {
  path: 'lists/:listId',
  loadComponent: () =>
    import('./pages/lists/view-list/view-list.component').then(m => m.ListComponent)
},


  { path: '**', redirectTo: '' },
];
