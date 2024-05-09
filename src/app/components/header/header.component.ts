import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  collection, getFirestore } from "firebase/firestore";
import {  query, where , getDocs} from '@angular/fire/firestore';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }
  nompr='';  
  //localStorage.getItem('user_uid');
  async logout() {
    await this.authService.logout();
     // Redirect to login page
  }

   isAccessTokenSet(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }
   async ngOnInit():Promise<void> {
    const db=getFirestore();
    const clientRef = collection( db, "Clients");
    if(this.isAccessTokenSet()){
      const q1 = query(clientRef, where("owner", "==", localStorage.getItem('user_uid')));
      const nompr1 = await getDocs(q1);
      nompr1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data()['Nom']);
      this.nompr = doc.data()['Prénom'] +" "+ doc.data()['Nom'] ;
      this.cdr.detectChanges();
      }); 
    }
      
      }
      // location.reload();
    }

