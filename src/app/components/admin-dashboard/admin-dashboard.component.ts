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
    MsgArray : DocumentData[]= new Array();
    ClientArray : DocumentData[]= new Array();
    CompArray: DocumentData[]= new Array();
    async ngOnInit():Promise<void> {
      const db=getFirestore();
      const clientRef = collection( db, "Clients");
      const CompRef = collection(db,"comptables");
      const MsgRef = collection(db, "contact");
      const q1 = query(clientRef);
      const c1 = await getDocs(q1);
      c1.forEach((doc) => {
        this.ClientArray.push(doc.data());
      });
    console.log(this.ClientArray);
      const q2 = query(CompRef);
      const c2 = await getDocs(q2);
      c2.forEach((doc) => {
        this.CompArray.push(doc.data());
      });
      console.log(this.CompArray);
      this.sortComptableData();
      const q3 = query(MsgRef);
      const c3 = await getDocs(q3);
      c3.forEach((doc) => {
        this.MsgArray.push(doc.data());
      });
      console.log(this.MsgArray);
    }

  info = false;
  msg = true;
  comptable = true;
  client = true;
  hideShow(x: number): void {
     this.client = true;
     this.comptable = true;
     this.msg = true;
    // this.contrat = true;
    if (x == 1)
      { this.info = false;}
    else if(x == 2)
      {this.msg =false;}
    else if(x == 3)
      {this.client = false;}
    else if (x == 4)
      {this.comptable = false;}
    else if (x == 5)
      {}
    else if(x == 6)
      {}
  }
  sortComptableData(): void {
    this.CompArray.sort((a, b) => {
      const idA = parseInt(a['id'], 10); // Parse id to integer (base 10)
      const idB = parseInt(b['id'], 10);
      return idA - idB; // Ascending order by id
    });
  }
}
