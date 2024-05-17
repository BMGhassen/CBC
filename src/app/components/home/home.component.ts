import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DomicilicionComponent } from '../domicilicion/domicilicion.component';
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { getFirestore, collection, where, getDocs,query, getCountFromServer } from '@angular/fire/firestore';
import { myCustomConstant } from '../../../gVar';
import { OffresComponent } from '../offres/offres.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DomicilicionComponent, RouterModule, CommonModule, OffresComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 
  ngOnInit(): void {

 }
  
}


