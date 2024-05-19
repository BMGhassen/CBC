import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OffresComponent } from './components/offres/offres.component';
import { DomicilicionComponent } from './components/domicilicion/domicilicion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { Msgadmin1Component } from './components/msgadmin1/msgadmin1.component';
import { isSetAccessorDeclaration } from 'typescript';
import { Msgadmin2Component } from './components/msgadmin2/msgadmin2.component';
import { ContratComponent } from './components/contrat/contrat.component';
import { ComptableComponent } from './components/comptable/comptable.component';


 const routeConfig: Routes = [
    {path: '', component: HomeComponent, title: 'Home Page'},
    {path: 'login', component: LoginComponent},
    {path: 'offres',component: OffresComponent},
    {path: 'domiciliation', component: DomicilicionComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'contact', component: ContactAdminComponent},
    {path: 'admin', component: AdminDashboardComponent},
    {path:'msgadmin1', component:Msgadmin1Component},
    {path:'msgadmin2', component:Msgadmin2Component},
    {path:'contrat', component:ContratComponent}
    {path:'Component', component:ComptableComponent}
   ];
    //{path: 'adminDashboard', component: AdminDashboardComponent}
    // Inside adminDashboard component 
    /**
     * Get admin Information
     * Store token
     * display infos
     */


export default routeConfig; 