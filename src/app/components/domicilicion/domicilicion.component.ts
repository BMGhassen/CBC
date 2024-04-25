import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
//import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-domicilicion',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './domicilicion.component.html',
  styleUrl: './domicilicion.component.css'
})
export class DomicilicionComponent implements OnInit{
  
  constructor() {}
    ngOnInit(): void {};
}
