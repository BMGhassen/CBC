import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, where, getDocs, query, DocumentData, getCountFromServer } from '@angular/fire/firestore';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-comptable',
  standalone: true,
  imports: [],
  templateUrl: './comptable.component.html',
  styleUrl: './comptable.component.css'
})
export class ComptableComponent {

}
