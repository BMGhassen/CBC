import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
 import {FirebaseStorage, getDownloadURL} from '@angular/fire/storage';
import { onAuthStateChanged } from 'firebase/auth'; 
 import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { getStorage, ref, listAll} from "firebase/storage";
import { getAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-courriers',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './courriers.component.html',
  styleUrl: './courriers.component.css'
})
export class CourriersComponent implements OnInit {
  //  constructor(private storage: FirebaseStorage) {}
  //This is where you store the file names and download url's
  filelist: string[] = [];
  async ngOnInit(): Promise<void> {
    // const auth = getAuth(); // Get Firebase Auth instance
    // onAuthStateChanged(auth, async (user) => {
    //   if (user) { // Check if user is signed in
    //     const userId = user.uid; // Use secure user ID retrieval

    //     try {
    //       const fileList = await this.getFileList(userId);
    //       this.filelist = fileList;
    //     } catch (error) {
    //       console.error('Error fetching files:', error);
    //       // Handle errors appropriately (e.g., display error message to user)
    //     }
    //   } else {
    //     // Handle scenario where user is not signed in
    //   }
    // });
    this.getFileList(localStorage.getItem("user_uid")!);
    
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
    // const fileList: string[] = []; // Array to store downloadable PDF URLs
    // console.log('waaaaaaaa'+ `clients/${userId}`)
    // try {
    //   const listResult = await listAll(ref(storage, `${userId}`)); // List files from user's folder
      
    //   for (const item of listResult.items) {
    //     const filename = item.name;
    //     if (filename.endsWith('.pdf')) { // Filter for PDF files
         
    //       const downloadURL = await getDownloadURL(ref(storage, `${userId}/${filename}`));
    //       fileList.push(downloadURL); // Add downloadable URL to list
    //     }
    //   }

    //   return fileList;

    // } catch (error) {
    //   console.error('Error fetching files:', error);
    //   // Handle errors appropriately (e.g., return empty list)
    //   return [];
    // }
  }
  
  downloadFile(fn: string){
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

    // Or inserted into an <img> element
    // const img = document.getElementById('myimg');
    // img.setAttribute('src', url);
  })
  .catch((error) => {
    console.log(error);
  });
  }

//This is the function you call (put it in ngOnInit or something of the like) to get the filenames
// getFileList() {
//   const ref = this.storage.ref('');
//   let myurlsubscription = ref.listAll().subscribe((data) => {
//     for (let i = 0; i < data.items.length; i++) {
//       let name = data.items[i].name;
//         let newref = this.storage.ref(data.items[i].name);
//       let url = newref.getDownloadURL().subscribe((data) => {
//         this.filelist.push(name);
//       });
//     }
//   });
// }
}
