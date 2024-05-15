import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { myCustomConstant } from '../../../gVar';
import { DocumentData, collection, getCountFromServer, getDocs, getFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css'
})
export class OffresComponent implements OnInit{
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

}
