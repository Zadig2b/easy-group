import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ParrainageComponent } from './pages/parrainage/parrainage.component';
import { ActualitesComponent } from './pages/actualites/actualites.component';
import { AssociationComponent } from './pages/association/association.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MentionsLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { PforchildComponent } from './pforchild/pforchild.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateListComponent } from './pages/lists/create-list/create-list.component';
import { ListComponent } from './pages/lists/view-list/view-list.component';

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
  { path: 'parrainage', component: ParrainageComponent },
  { path: 'un-parrain-pour-son-enfant', component: PforchildComponent },
  { path: 'actualites', component: ActualitesComponent },
  { path: 'association', component: AssociationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mentions-legales', component: MentionsLegalesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lists/create', component: CreateListComponent },

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
