import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-domicilicion',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './domicilicion.component.html',
  styleUrl: './domicilicion.component.css'
})
export class DomicilicionComponent implements OnInit{

    constructor() {}
    ngOnInit(): void {
    }
   
    
}
