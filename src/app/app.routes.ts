import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DomicilicionComponent } from './components/domicilicion/domicilicion.component';
import { DetailsComponent } from './components/details/details.component';

 const routeConfig: Routes = [
    {path: '', component: HomeComponent, title: 'Home Page'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'domiciliation', component: DomicilicionComponent},
    {path: 'details', component: DetailsComponent}
];
export default routeConfig; 