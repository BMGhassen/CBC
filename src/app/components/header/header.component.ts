import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomicilicionComponent } from '../domicilicion/domicilicion.component';
import { doc, getDoc, collection, getFirestore } from "firebase/firestore";
import { Firestore, documentId, query, where ,collectionGroup, getDocs} from '@angular/fire/firestore';
import firebase from '@angular/fire';
import { initializeApp } from "firebase/app";
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  //firestore: Firestore = inject(Firestore);
 
  nompr = localStorage.getItem('user_uid');
  async ngOnInit():Promise<void> {
    const db=getFirestore();
    const clientRef = collection( db, "Clients");
   const q1 = query(clientRef, where("owner", "==", localStorage.getItem('user_uid')));
   const nompr1 = await getDocs(q1);
    nompr1.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data()['Nom']);
     this.nompr = doc.data()['Prénom']+" "+doc.data()['Nom'] ;
    });
  
  
//  

}

  isAccessTokenSet(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }
  
}
