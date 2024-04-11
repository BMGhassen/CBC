import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { DetailsComponent } from './components/details/details.component';
import { DoneComponent } from './components/done/done.component';
import { PackComponent } from './components/pack/pack.component';
import { FormComponent } from './components/form/form.component';
import { DomicilicionComponent } from './components/domicilicion/domicilicion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterModule,
    HomeComponent, 
    LoginComponent, 
    FooterComponent, 
    HeaderComponent, 
    SignupComponent,
    DetailsComponent,
    DoneComponent, PackComponent, FormComponent,
    DomicilicionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cairus';
}
