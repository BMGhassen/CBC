import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 

   fb = inject(FormBuilder);
   http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

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
        next: () => {
          this.router.navigateByUrl('/');
        },
        
        error: (err) => {
          this.errorMessage = err.code;
        }
      });
      console.log(rawform.email, rawform.password);
  }
  hasForm(): boolean {
    return this.form !== null;
  }
}
