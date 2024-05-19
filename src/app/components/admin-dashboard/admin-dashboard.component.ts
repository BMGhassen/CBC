import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { getFirestore, collection, where, getDocs, query, DocumentData, getCountFromServer, setDoc, doc, Firestore, addDoc, FirestoreModule } from '@angular/fire/firestore';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Msgadmin1Component } from '../msgadmin1/msgadmin1.component';
import { ComptableComponent } from '../comptable/comptable.component';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [CommonModule, RouterOutlet,FirestoreModule, RouterModule, Msgadmin1Component,ComptableComponent,FormsModule,ReactiveFormsModule]
})
export class AdminDashboardComponent implements OnInit{
  firestore: Firestore = inject(Firestore); 
  authService = inject(AuthService);
  exist:boolean=false;
  constructor(private fb: FormBuilder) {

  }

  
  adminForm : FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tel:['',[Validators.required,Validators.pattern(/^\d{8}$/)]],
    cin:['', [Validators.required, Validators.pattern(/^\d{8}$/)]]

})

  

    MsgArray : DocumentData[]= new Array();
    ClientArray : DocumentData[]= new Array();
    CompArray: DocumentData[]= new Array();
    async ngOnInit():Promise<void> {
      const db=getFirestore();
      const clientRef = collection( db, "Clients");
      const CompRef = collection(db,"comptables");
      const MsgRef = collection(db, "contact");
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
      const q3 = query(MsgRef);
      const c3 = await getDocs(q3);
      c3.forEach((doc) => {
        this.MsgArray.push(doc.data());
      });
      console.log(this.MsgArray);
    }

  info = false;
  msg = true;
  comptable = true;
  client = true;
  hideShow(x: number): void {
     this.client = true;
     this.comptable = true;
     this.msg = true;
    // this.contrat = true;
    if (x == 1)
      { this.info = false;}
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
      const idA = parseInt(a['id'], 10); // Parse id to integer (base 10)
      const idB = parseInt(b['id'], 10);
      return idA - idB; // Ascending order by id
    });
  }
  async saveData(): Promise<void> {

    if (!this.exist ) {
      const response = await this.authService.register(
        this.adminForm.value.email,
        this.adminForm.value.name,
        this.adminForm.value.tel,
      ).toPromise();
  
      const accessToken = response?.user?.accessToken;
      const userUid = response?.user?.uid;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user_uid', userUid);
      
    }
    
    const comptablesRef = collection(this.firestore, 'comptables');
    const newComptable = {
      Nom: this.adminForm.value.name,
      Tel: this.adminForm.value.tel,
      email: this.adminForm.value.email
    };
    await addDoc(comptablesRef, newComptable); // Add new comptable document
    console.log("New comptable data saved successfully!");
  } catch (error:any) {
    console.error("Error saving data:", error);
    // Handle registration or data saving errors (e.g., display error message)
  }
  submitForm(): void {
    this.saveData();
  }
}
