import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject, ɵɵqueryRefresh } from '@angular/core';
import { getFirestore, collection, where, getDocs, query, DocumentData,getCountFromServer, setDoc, doc, Firestore, addDoc, FirestoreModule, deleteDoc, getDoc } from '@angular/fire/firestore';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Msgadmin1Component } from '../msgadmin1/msgadmin1.component';
import { ComptableComponent } from '../comptable/comptable.component';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MessagerieComponent } from '../messagerie/messagerie.component';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import firebase from 'firebase/app';
import 'firebase/storage';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [CommonModule, RouterOutlet,FirestoreModule, RouterModule, 
              Msgadmin1Component,ComptableComponent,FormsModule, 
              ReactiveFormsModule, MessagerieComponent,AngularFireStorageModule]
})
export class AdminDashboardComponent implements OnInit{
  [x: string]: any;
  storageRef: any; // Reference to Firebase Storage
  file: File | null = null;
  uploadTask: any; // Upload task reference
  firestore: Firestore = inject(Firestore); 
  authService = inject(AuthService);
  exist=false;
  isVisible = false ;
  alertmail=false;
  alertcin=false;
  submit=false;
  emailexist=false;
  prenom = null;
  nom = null;
  constructor(private fb: FormBuilder,private auth: AuthService) {}

  async uploadFile(userId: string, event:any) {
    const file = event.target.files[0];
    const storage = getStorage(); // Get the storage instance
    const storageRef = ref(storage, 'clients/'+userId+'/'+file.name);
    console.log(file.name);
    try {
        // Upload the file
        // await uploadString(ghostFile, '')
        await uploadBytes(storageRef, file);
        console.log('File uploaded successfully:', file.name);
        // You may want to do something after successful upload
    } catch (error) {
        console.error('Error uploading file:', error);
        // Handle upload error
    }
}




  adminForm : FormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
    mail: ['', [Validators.required, Validators.email]],
    tel:['',[Validators.required,Validators.pattern(/^\d{8}$/)]],
    cin:['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    mdp:['',Validators.required]

  })

  

    
    ClientArray : DocumentData[]= new Array();
    CompArray: DocumentData[]= new Array();

    async ngOnInit():Promise<void> {
      const db=getFirestore();
      const admin=collection(db,'Admin');
      const clientRef = collection( db, "Clients");
      const CompRef = collection(db,"comptables");
      const a1=query(admin);
      const a2=await getDocs(a1);
      a2.forEach((doc)=>{
        this.nom=doc.data()['nom'];
        this.prenom=doc.data()['prenom'];
      })
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
      
    }

  
  msg = false;
  comptable = true;
  client = true;
  hideShow(x: number): void {
     this.client = true;
     this.comptable = true;
     this.msg = true;
    
    if (x == 1)
      { }
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
      const idA = parseInt(a['id'], 10); 
      const idB = parseInt(b['id'], 10);
      return idA - idB;  
    });
  }

  async saveData(): Promise<void> {
    const cin = this.adminForm.value.cin;
    const mail=this.adminForm.value.mail;
    console.log(mail);
    this.emailexist=await this.mailexist(mail);
    this.exist = await this.checkComptableExistence(cin);
    const firestore=getFirestore();
    if (this.exist ){
      this.alertcin=true;
      
    }
    else{
      this.alertcin=false;
    }
    console.log(this.emailexist);
    if (this.emailexist){
      this.alertmail=true;
      
    }
    else {
      this.alertmail=false;
    }
    if (!this.exist && !this.emailexist) {
      const response = await this.authService.register(
        this.adminForm.value.mail,
        this.adminForm.value.name ,
        this.adminForm.value.mdp
      ).toPromise();
  
      const accessToken = response?.user?.accessToken;
      const userUid = response?.user?.uid;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user_uid', userUid);
    
      const comptableCollection = collection(this.firestore, 'comptables');
      
      const newComptable = {
       
        'cin': this.adminForm.value.cin,
        'Nom & Prénom': this.adminForm.value.name,
        'tel': this.adminForm.value.tel,
        'mail': this.adminForm.value.mail,
        'mdp': this.adminForm.value.mdp, 
      }
      await addDoc(comptableCollection, newComptable);
      
      location.reload();
    }
    
    

    }


  submitForm(): void {
   
    this.saveData();
  }

  async checkComptableExistence(cin: string): Promise<boolean> {
    const comptablesRef = collection(this.firestore, 'comptables');
    const q = query(comptablesRef, where('cin', '==', cin));
    const snapshot = await getDocs(q);
  
    return snapshot.size > 0;
  }

  async mailexist(mail:string): Promise<boolean> {
    const comptablesRef = collection(this.firestore, 'comptables');
    const q = query(comptablesRef, where('mail', '==', mail));
    const snapshot = await getDocs(q);
    return snapshot.size > 0;
  }

    
toggleComptableForm() {
  this.isVisible=true;
}

annuler (){
  this.isVisible=false;
}

buttonsubmit (){
  
  this.submit=true;
}

async deleteComptable(comptable: DocumentData) {
  const db=getFirestore();
      const CompRef = collection(db,"comptables");
      const q1 = query(CompRef, where("cin", "==", comptable['cin']));
      const c1 = await getDocs(q1);
      const snapshot = await getDocs(q1);
      c1.forEach((doc1) => {
        const id=doc1.id;
         deleteDoc(doc(db,"comptables",id));
      });
  
  // await deleteDoc("comptabeles",q1);
  console.log('Comptable deleted:', comptable);

  const index = this.CompArray.findIndex(item => item['cin'] === comptable['cin']);
  if (index > -1) {
    this.CompArray.splice(index, 1);
  }

}
}