import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
  constructor( private location: Location) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.location.back();
    }
  }
  router = inject(Router);

  fb = inject(FormBuilder);
  http = inject(HttpClient);
   authService = inject(AuthService);


  form = this.fb.nonNullable.group({
    username: ['', Validators.required], 
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    console.log('Form submitted');
    const rawform = this.form.getRawValue();
    this.authService
      .login(rawform.email, rawform.password)
      .subscribe({
        next: (response) => {
          const accessToken = response!.user!.accessToken;
          const user_uid = response!.user!.uid;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('user_uid', user_uid);
          this.router.navigateByUrl('/');
        },
        
        error: (err) => {
          this.errorMessage = err.code;
        }
      });
      

  }
  hasForm(): boolean {
    return this.form !== null;
  }
}
