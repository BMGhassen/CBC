import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { collection, getDocs, getFirestore, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  isLoginInProgress: boolean | undefined;
  errorMessage: string | null = null; 
  form = this.fb.nonNullable.group({ 
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.location.back();
    }
  }
  // router = inject(Router);

  // fb = inject(FormBuilder);
  // http = inject(HttpClient);
  //  authService = inject(AuthService);
  data: any[] = [];
  
  validateEmail(email: string): boolean {
    if (!email) {
      return true; // Consider email field valid if empty (adjust if needed)
    }
    const emailRegex = /^\S+@\S+\.\S+$/; 
    return emailRegex.test(email);
  }
  noemail=false;
  noform=false;
  nopwd=false;
  login=false;

  
  
  onSubmit(): void {
    console.log('Form submitted');
    const rawform = this.form.getRawValue();
    const email = rawform.email.trim();
    this.isLoginInProgress = true;
    this.errorMessage = null;
    this.authService
      .login(email,rawform.password.trim())
      .subscribe({
        next: (response) => {
          
          const accessToken = response!.user!.accessToken;
          const user_uid = response!.user!.uid;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('user_uid', user_uid);
          this.router.navigateByUrl('/');
          this.isLoginInProgress = false;
        },
        error: (err:any) => {
          
          this.handleAuthError(err);
          this.isLoginInProgress = false;
        }, 
        
      });
      if (!email) {
        this.noemail = true 

        this.noform=false
        // Email not entered
      } 
      if (!this.validateEmail(email)) {
        this.noemail=false
        this.nopwd=false
        this.noform=true 
        // Invalid email format
      }
      else
      {
        
        this.noform=false
      }

      
      const mdp=rawform.password.trim();
      if(!mdp ) 
        {
          this.nopwd=true
        }  
  }

  handleAuthError(err: any): void {
    console.error('Authentication Error:', err); 
    const rawform = this.form.getRawValue();// Log the error object for inspection
    const email = rawform.email.trim();
    switch (err.code) {
      case 'auth/invalid-credential':
        this.errorMessage = 'Mot de passe ou Email invalide';
        this.nopwd=false
        this.noemail=false
        this.noform=false
        break;
      case 'auth/invalid-email' :
        if (email)
          {
            this.nopwd=false
            
          }
        break;
      case this.validateEmail(email)  :
        this.noform=false
        this.noemail=false
        break; 
    }

  }
  

  hasForm(): boolean {
    return this.form !== null;
  }
}

          // User redirection
          // Add Role attribute : 1 / 0 - user / admin

          /** 
           * 
           * If (response.user.role == 'user'){
           *  this.router.navigateByUrl("/")
           * } else (response.user.role == 'admin')
           * this.router.navigateByUrl("/adminDashboard")
           */

