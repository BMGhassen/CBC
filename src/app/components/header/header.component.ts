import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  collection, getFirestore } from "firebase/firestore";
import {  query, where , getDocs} from '@angular/fire/firestore';
import { AuthService } from '../../auth.service';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  nompr = '';
  userId= '***';
  private usernameSubject = new BehaviorSubject<string>(this.nompr);
  username$ = this.usernameSubject.asObservable();
  constructor(private authService: AuthService, private router: Router) { } 
  //localStorage.getItem('user_uid');
  async logout() {
    await this.authService.logout();
     // Redirect to login page
  }

   isAccessTokenSet(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }
  async checkAdminOwner(): Promise<boolean> {
    var ison=false;
    const accessToken = localStorage.getItem('accessToken');
    const db = getFirestore();
      const adminRef = collection(db, "Admin");
      const q = query(adminRef, where("owner", "==",localStorage.getItem('user_uid') ));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
            ison=true;
      });
      // console.log(snapshot);
      // Check if any documents exist in the snapshot
      return !snapshot.empty;
  }
  async DisplayUsername():Promise<void> {
    const accessToken = localStorage.getItem('accessToken');
    const db=getFirestore();
    const clientRef = collection( db, "Clients");
    if(accessToken){
      const q1 = query(clientRef, where("owner", "==", localStorage.getItem('user_uid')));

      const nompr1 = await getDocs(q1);
      nompr1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.nompr = doc.data()['Prénom'] +" "+ doc.data()['Nom'] ;
      this.usernameSubject.next(this.nompr);
      });
      const isAdmin = await this.checkAdminOwner();
      this.isadmin1 = isAdmin; 
    }
    // const isAdmin = await this.checkAdminOwner();
    // this.isadmin1 = isAdmin;
      }
      isadmin1:Boolean | undefined;
   async ngOnInit():Promise<void> {
    console.log('***')
    await this.DisplayUsername();
    // if (await this.checkAdminOwner()){
    //  this.isadmin1=true;
     
    // }
    
    console.log(this.isadmin1);
    this.username$
      .pipe(
        debounceTime(500), // Adjust debounce time as needed
        distinctUntilChanged(),
        switchMap(() => this.DisplayUsername())
      )
      .subscribe();

    // Call DisplayUsername initially if needed
    await this.DisplayUsername();
      }
      onChange(event: any) {
        console.log("Selected pack:", event.target.value);
        this.DisplayUsername();
        
      }
      // location.reload();
    }

