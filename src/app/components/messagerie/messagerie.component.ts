import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ɵɵqueryRefresh } from '@angular/core';
import { getFirestore, collection, where, getDocs, query, DocumentData, getCountFromServer, setDoc, doc, Firestore, addDoc, FirestoreModule, deleteDoc } from '@angular/fire/firestore';
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

  copyEmail(email: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = email;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log('Email copied to clipboard:', email);
  }

  async deleteMessage(msg: DocumentData) {
    try {
      const db = getFirestore();
      const msgRef = collection(db, "contact");
      const q = query(msgRef, where("message", "==", msg['message']));
  
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref); // Delete the document directly from the snapshot
      });
  
      console.log('Message deleted:', msg);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
    const index = this.MsgArray.findIndex(item => item['message'] === msg['message']);
  if (index > -1) {
    this.MsgArray.splice(index, 1);
  }
  }
}
