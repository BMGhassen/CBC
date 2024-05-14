import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DomicilicionComponent } from './components/domicilicion/domicilicion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';

 const routeConfig: Routes = [
    {path: '', component: HomeComponent, title: 'Home Page'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'domiciliation', component: DomicilicionComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'contact', component: ContactAdminComponent},
    { path: 'domiciliation/:packName', component: DomicilicionComponent },

    //{path: 'adminDashboard', component: AdminDashboardComponent}
    // Inside adminDashboard component 
    /**
     * Get admin Information
     * Store token
     * display infos
     */

];
export default routeConfig; 