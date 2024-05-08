import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { getFirestore, collection, where, getDocs, query } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';
import firebase from '@angular/fire';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  prenom = null;
  nom = null;
  email = null;
  rs = null;
  pack= null;
  service = null;
  adresse = null;
  async ngOnInit():Promise<void> {
    const db=getFirestore();
    const clientRef = collection( db, "Clients");
    
   const q1 = query(clientRef, where("owner", "==", localStorage.getItem('user_uid')));
   const nompr = await getDocs(q1);
    nompr.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     this.prenom = doc.data()['Prénom'] ;
     this.nom = doc.data()['Nom'];
     this.email = doc.data()['email'];
     this.rs = doc.data()['Raison_Sociale'];
     this.pack = doc.data()['pack'];
     this.service = doc.data()['service'];
     this.adresse = doc.data()['Adresse']
    });
  
  }
  info = false;
  courriers = true;
  contrat = true;
  hideShow(x: number): void {
    this.info = true;
    this.courriers = true;
    this.contrat = true;
    if (x == 1)
      { this.info = false;}
    else if(x == 2)
      {this.courriers =false;}
    else if(x == 3)
      {this.contrat =false;}
    else if (x == 4)
      {}
    else if (x == 5)
      {}
    else if(x == 6)
      {}
  }
  
}
