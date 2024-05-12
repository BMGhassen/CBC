import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomicilicionComponent } from '../domicilicion/domicilicion.component';
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { getFirestore, collection, where, getDocs,query, getCountFromServer } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DomicilicionComponent,RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
      reorderedBlogs: any;
prix: any;
      constructor(){
        console.log('localStorage accessToken:', localStorage.getItem('accessToken'));
      }
      domiciliation = null;
      courriers = null;
      conseil = null;
      notification = null;
      réexpédition= null;
      support_client = null;
      salle = null;
      espace_personnel=null;
      comptable=null;
      title=null;
      

      BlogsArray : DocumentData[]= new Array();
      async ngOnInit():Promise<void> {
        
        const db=getFirestore();
        const bundleRef = collection( db, "bundles");
        const snapshot = await getCountFromServer(bundleRef);
        console.log(snapshot.data().count);
        
       const nompr = await getDocs(bundleRef);
        nompr.forEach((doc) => {
          
        this.BlogsArray.push(doc.data());
        this.reorderedBlogs = this.BlogsArray.slice().reverse();
        
        });
      
      //BlogsArray = [{title:Blogs1,Content:hello,button:Click},{},{}]

      /**
       * GetBlogs(){
       * 
       * GetRequest
       * 
       * this.BlogsArray = response.blogs
       * }
       */
}
}


