import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { getFirestore, collection, where, getDocs, query } from '@angular/fire/firestore';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import firebase from '@angular/fire';
import { initializeApp } from "firebase/app";
import { ContactAdminComponent } from '../contact-admin/contact-admin.component';
import { ContratComponent } from '../contrat/contrat.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactAdminComponent, RouterOutlet, ContratComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  prenom = null;
  nom = null;
  email = null;
  rs = null;
  adresse = null;
  tel = null;
  cin=null;
  offre=null;
  fj=null;
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
     this.adresse = doc.data()['Adresse'];
     this.tel = doc.data()['Tel'],
     this.cin=doc.data()['Cin'],
     this.offre=doc.data()['offre'],
     this.fj=doc.data()['Forme_Juridique']
    });
  
  }
  info = false;
  courriers = true;
  contrat = true;
  expert=false;
  hideShow(x: number): void {
    this.info = true;
    this.courriers = true;
    this.contrat = true;
    this.expert=true;
    if (x == 1)
      { this.info = false;}
    else if(x == 2)
      {this.courriers =false;}
    else if(x == 3)
      {this.contrat =false;}
    else if (x == 4)
      {this.expert=false;}
    else if (x == 5)
      {}
    else if(x == 6)
      {}
  }
  
}
