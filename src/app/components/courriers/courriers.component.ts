import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
 import {FirebaseStorage, getDownloadURL} from '@angular/fire/storage';
 import { AngularFireStorage } from '@angular/fire/compat/storage';
import { onAuthStateChanged } from 'firebase/auth'; 
 import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { getStorage, ref, listAll} from "firebase/storage";
import { getAuth } from '@angular/fire/auth';
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { BrowserModule } from '@angular/platform-browser';
import { error } from 'jquery';

@Component({
  selector: 'app-courriers',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './courriers.component.html',
  styleUrl: './courriers.component.css'
})
export class CourriersComponent implements OnInit {
  filelist: string[] = [];
  async ngOnInit(): Promise<void> {
    
    this.getFileList(this.user_id!);
    
  }
user_id=localStorage.getItem('user_uid')

getFileList(userId: string) {
    const storage = getStorage(); // Get the storage instance
    const storageRef=ref(storage);
    const listRef = ref(storage, 'clients/'+this.user_id);
    console.log("*************" )
    console.log(listRef )
    console.log("*************" )
// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      console.log(folderRef.name)
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      console.log(itemRef.name)
      this.filelist.push(itemRef.name);
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
  }
  
  async downloadFile(fn: string){

    const storage = getStorage();
    console.log('/clients/'+this.user_id+'/'+fn)
    getDownloadURL(ref(storage, 'clients/'+this.user_id+'/'+fn))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      
      xhr.open('GET', url);
      xhr.send();
      console.log(url)
      window.open(url, '_blank');
      // Or inserted into an <img> element
      // const img = document.getElementById('myimg');
      // img.setAttribute('src', url);
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
