import { Component, ViewChild, ElementRef } from '@angular/core';
import jspdf, {  jsPDF } from'jspdf';
import {CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import html2canvas from 'html2canvas';
import { collection, getDocs, getFirestore, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-contrat',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './contrat.component.html',
  styleUrl: './contrat.component.css'
})

export class ContratComponent {
  @ViewChild('contrat',{static: false}) el!: ElementRef;
  private element: HTMLElement | null = null;
  prenom = null;
  nom = null;
  email = null;
  rs = null;
  pack= null;
   gold=false;
   plus=false;
   standard=false;
  adresse = null;
  tel = null;
  cin = null;
  fj = null;
  mf = null;
  offre = null;
  premier = false;
  montant = null;
  async ngOnInit() {
      const db=getFirestore();
      const clientRef = collection( db, "Clients");

      const q1 = query(clientRef, where("owner", "==", localStorage.getItem('user_uid')));
      const c1 = await getDocs(q1);
      c1.forEach((doc) => {
        this.prenom = doc.data()['Prénom'] ;
        this.nom = doc.data()['Nom'];
        this.email = doc.data()['email'];
        this.rs = doc.data()['Raison_Sociale'];
        this.pack = doc.data()['pack'];
        this.fj = doc.data()['Forme_Juridique']
        this.adresse = doc.data()['Adresse'];
        this.tel = doc.data()['Tel'];
        this.cin = doc.data()['Cin'];
        this.mf = doc.data()['Matricule_Fiscale'];
        this.offre = doc.data()['offre'];
        this.montant = doc.data()['montant']
      });
      if(this.offre == 'Cairus Gold'){
          this.standard = false;
            this.gold = true;
            this.plus = false;
          }else if(this.offre == 'Cairus Plus'){
            this.standard = false;
            this.gold = false;
            this.plus = true;
          }else if(this.offre == 'Cairus Standard'){
            this.standard = true;
            this.gold = false;
            this.plus = false;
          }
      this.element = document.getElementById('contrat');
  }
  generatePDF(){

    var data = document.getElementById('contrat') as HTMLElement;
    let pdf = new jsPDF('p', 'pt', 'a4');
      pdf.html(this.el.nativeElement,{
        callback: (pdf)=>{ 
          pdf.save("sample.pdf");
        }
      });
    }
}


