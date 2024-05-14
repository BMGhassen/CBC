import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { DomicilicionComponent } from './components/domicilicion/domicilicion.component';
import { user } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { Msgadmin1Component } from './components/msgadmin1/msgadmin1.component';
import { Msgadmin2Component } from './components/msgadmin2/msgadmin2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterModule,
    HomeComponent, 
    LoginComponent, 
    FooterComponent, 
    HeaderComponent, 
    ProfileComponent,
    DomicilicionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Cairus';
  authService = inject(AuthService)
  
  ngOnInit(): void{
  //     this.authService.user$.subscribe(user =>{
  //       if(user) {
  //         this.authService.currentUserSig.set({
  //           email: user.email!,
  //           username: user.displayName!,
  //           uid: user.uid!
  //     });
  //     } else {
  //        this.authService.currentUserSig.set(null);
  //       }
        //     console.log(this.authService.currentUserSig());

  // });
  }
}
