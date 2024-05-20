import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { myCustomConstant } from '../../../gVar';
import { DocumentData, collection, getCountFromServer, getDocs, getFirestore, query, where } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Observable, interval, timer } from 'rxjs';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css'
})
export class OffresComponent implements OnInit{
  [x: string]: any;
  reorderedBlogs: any;
prix: any;
loggedin=false;
admin=false;
  constructor(private router: Router, ){
    console.log('localStorage accessToken:', localStorage.getItem('accessToken'));

  }
  // gpackname="";
    async navigateToPackDetails(packName: string): Promise<void> {
      myCustomConstant.myCustomProperty = packName;
      const selectedBlog = this.BlogsArray.find(blog => blog['title'] === packName);
      const login=this.isLoggedIn();
      if (selectedBlog && !login) {
       
        this.router.navigate(['/domiciliation', {
          title: selectedBlog['title'],
          prix: selectedBlog['prix'],
          reexpedition: selectedBlog['réexpédition'],
          salle: selectedBlog['salle'],
          comptable: selectedBlog['comptable']
        }]);
       
      } else {
        console.error("Blog with title", packName, "not found");
      }
      
  }
  
  BlogsArray : DocumentData[]= new Array();
  blog:any[]=new Array(); 
  // BlogsArray1 : DocumentData[]= new Array();
  

async ngOnInit():Promise<void> {
  const db=getFirestore();
  const bundleRef = collection( db, "bundles");
  const snapshot = await getCountFromServer(bundleRef);
  console.log(snapshot.data().count);
    console.log(myCustomConstant.x1);
    console.log(myCustomConstant.x2);
  const nompr = await getDocs(bundleRef);
  nompr.forEach((doc) => {
      
  this.BlogsArray.push(doc.data());
  this.reorderedBlogs = this.BlogsArray.slice().reverse();
    
  });
  // this.blogDataService.setBlogs(this.BlogsArray.slice()); 
  console.log(this.BlogsArray);

}

isLoggedIn(): boolean {
  const hasAccessToken = localStorage.getItem('accessToken') !== null;
  this.loggedin=false;
  timer(1000);
  if (hasAccessToken) {
    this.loggedin = true;
    console.log('localStorage accessToken:', localStorage.getItem('accessToken'));
    return true;
  } else {
    this.loggedin = false;
    return false;
  }
}
async DisplayUsername():Promise<void> {

  console.log('header'+localStorage.getItem('user_uid'));
  const accessToken = localStorage.getItem('accessToken');
  const db=getFirestore();
  const clientRef = collection( db, "Clients");
  if(accessToken){
    const q1 = query(clientRef, where("owner", "==", localStorage.getItem('user_uid')));

    const nompr1 = await getDocs(q1);
    nompr1.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // doc.data() is never undefined for query doc snapshots
      this['nompr'] = doc.data()['Prénom'] +" "+ doc.data()['Nom'] ;
    this['usernameSubject'].next(this['nompr']);
    });
    const isAdmin = await this.checkAdminOwner();
    this['isadmin1'] = isAdmin; 
  }
  // const isAdmin = await this.checkAdminOwner();
  // this.isadmin1 = isAdmin;
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
      this.admin=!snapshot.empty;
      return !snapshot.empty;
  }


}
