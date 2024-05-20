import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ɵɵqueryRefresh } from '@angular/core';
import { getFirestore, collection, where, getDocs, query, DocumentData, getCountFromServer, setDoc, doc, Firestore, addDoc, FirestoreModule } from '@angular/fire/firestore';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Msgadmin1Component } from '../msgadmin1/msgadmin1.component';
import { ComptableComponent } from '../comptable/comptable.component';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-messagerie',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FirestoreModule, RouterModule],
  templateUrl: './messagerie.component.html',
  styleUrl: './messagerie.component.css'
})
export class MessagerieComponent implements OnInit{
  MsgArray : DocumentData[]= new Array();
  firestore: Firestore = inject(Firestore);
  async ngOnInit():Promise<void> {
    const db=getFirestore(); 
    const MsgRef = collection(db, "contact");
    const q3 = query(MsgRef);
      const c3 = await getDocs(q3);
      c3.forEach((doc) => {
        this.MsgArray.push(doc.data());
      });
  }
}
