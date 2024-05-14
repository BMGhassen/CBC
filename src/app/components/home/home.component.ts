import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DomicilicionComponent } from '../domicilicion/domicilicion.component';
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { getFirestore, collection, where, getDocs,query, getCountFromServer } from '@angular/fire/firestore';
import { myCustomConstant } from '../../../gVar';

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
      constructor(private router: Router, ){
        console.log('localStorage accessToken:', localStorage.getItem('accessToken'));

      }
      // gpackname="";
        async navigateToPackDetails(packName: string): Promise<void> {
          myCustomConstant.myCustomProperty = packName;
          const selectedBlog = this.BlogsArray.find(blog => blog['title'] === packName);
          if (selectedBlog) {
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
      // setPackDetails(title: string, prix: number) {
      //   this.packDetailsService.setPackDetails({ title, prix });
      // }
      // async navigateToPackDetails1 (packName: string) {
        
      //   this.gpackname=packName;
      //   this.getBlogArray1();
        
      //   console.log("oooo");
      //   console.log(this.BlogsArray1);
      //   this.navigateToPackDetails(packName);
       
      // }
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
      // for (let i=0; i< this.BlogsArray.length;i++ ){
      //   if (this.BlogsArray[i]['title'])
      //     {
      //       this.blog == this.BlogsArray[i];
      //       console.log(this.blog);
      //     }
      // }
    }

// async getBlogArray1():Promise<void> {
  
//     const db=getFirestore();
    
//     const bundleRef = collection( db, "bundles");
   
//     console.log(this.gpackname+"+++++++");
//       const q1 = query(bundleRef, where("title", "==", this.gpackname));
     
//       const nompr1 = await getDocs(q1);
//       console.log("AAAAAAAAAAAAAA   "+nompr1.size);
//       nompr1.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(this.gpackname+"______");
//       this.BlogsArray1.push(doc.data());
//       console.log(doc.data());
//       }); 
    
// }
}


