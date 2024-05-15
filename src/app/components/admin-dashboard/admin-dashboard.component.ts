import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, where, getDocs, query, DocumentData, getCountFromServer } from '@angular/fire/firestore';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Msgadmin1Component } from '../msgadmin1/msgadmin1.component';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [CommonModule, RouterOutlet, RouterModule, Msgadmin1Component]
})
export class AdminDashboardComponent implements OnInit{
    // gencontrat=false;
    // cl=false;
    // serv=false;
    // clmsg=false;
    // vismsg=false;
    // contrat=false;
    // factures=false;
    
    prenom = null;
    nom = null;
    email = null;
    rs = null;
    pack= null;
    service = null;
    adresse = null;
    tel = null;
    mf = null;
    ClientArray : DocumentData[]= new Array();
    async ngOnInit():Promise<void> {
      const db=getFirestore();
      const clientRef = collection( db, "Clients");
      const snapshot = await getCountFromServer(clientRef);
     const q1 = query(clientRef);
     const nompr = await getDocs(q1);
      nompr.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       this.prenom = doc.data()['Prénom'] ;
       this.nom = doc.data()['Nom'];
       this.email = doc.data()['email'];
       this.rs = doc.data()['Raison_Sociale'];
       this.pack = doc.data()['pack'];
       this.service = doc.data()['service'];
       this.adresse = doc.data()['Adresse'];
       this.tel = doc.data()['Tel'];
       this.mf = doc.data()['Matricule_Fiscale']
       this.ClientArray.push(doc.data());
      });
    console.log(this.ClientArray);
    }

  info = false;
  courriers = true;
  contrat = true;
  client = true;
  hideShow(x: number): void {
    this.info = true;
    this.courriers = true;
    this.contrat = true;
    if (x == 1)
      { this.info = false;}
    else if(x == 2)
      {this.courriers =false;}
    else if(x == 3)
      {this.client = false;}
    else if (x == 4)
      {}
    else if (x == 5)
      {}
    else if(x == 6)
      {}
  }
}
