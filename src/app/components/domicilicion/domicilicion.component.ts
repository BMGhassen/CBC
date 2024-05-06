import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Firestore, FirestoreModule, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import {
  CollectionReference,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-domicilicion',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, FirestoreModule],
  templateUrl: './domicilicion.component.html',
  styleUrls: ['./domicilicion.component.css'],
})
export class DomicilicionComponent {
  static isAccessTokenSet() {
    throw new Error('Method not implemented.');
  }
  // domiciliationForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  FieldsetNumber: number;

  user: any;
  isloggedIn: Boolean;
  packAmount: number;
  constructor(private location: Location) {
    this.packAmount = 0;
    this.FieldsetNumber = 1;
    this.user = localStorage.getItem('uid');

    if (!this.user) {
      this.isloggedIn = false;
    } else {
      this.isloggedIn = true;
    }

  }



  @ViewChild("DomiForm") domiciliationForm!: NgForm; // Use type assertion for FormGroup
  firestore: Firestore = inject(Firestore);



  nextFieldset(): void {
    console.log("next :" + this.FieldsetNumber, this.isloggedIn)
    if (this.FieldsetNumber < 4) {
      if (this.FieldsetNumber == 2 && this.isloggedIn == true) {
        this.FieldsetNumber = 4;
      } else {
        this.FieldsetNumber++;
      }

    }
  }

  prevFieldset(): void {
    console.log("prev :" + this.FieldsetNumber, this.isloggedIn)

    if (this.FieldsetNumber >= 2) {
      this.FieldsetNumber--;
    }
  }


  getMontant(pack: string) {
    console.log("pack : " + pack);
    if (pack === 'basic') {
      return 100;
    } else if (pack === 'premium') {
      return 200;
    } else {
      return 0; // Or set a default value if no pack is selected
    }
  }
  async saveData(): Promise<void> {

    if (this.isloggedIn === false && !this.user) {
      const response = await this.authService.register(
        this.domiciliationForm.form.value.email,
        this.domiciliationForm.form.value.Nom + this.domiciliationForm.form.value.Prénom,
        this.domiciliationForm.form.value.mdp
      ).toPromise();
  
      const accessToken = response?.user?.accessToken;
      const userUid = response?.user?.uid;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user_uid', userUid);
      this.user = userUid;
      //console.log("hedhy t'executi 1 " + this.user);
      // this.authService
      //   .register(this.domiciliationForm.form.value.email,
      //     this.domiciliationForm.form.value.Nom + this.domiciliationForm.form.value.Prénom
      //     , this.domiciliationForm.form.value.mdp)
      //   .subscribe({
      //     next: (response) => {
      //       const accessToken = response!.user!.accessToken;
      //       const user_uid = response!.user!.uid;
      //       localStorage.setItem('accessToken', accessToken);
      //       localStorage.setItem('user_uid', user_uid);
      //       this.user = user_uid;
      //       console.log("hedhy t'executi 1 " + this.user)
      //       // this.router.navigateByUrl('/');
      //     },

      //     error: (err) => {
      //       console.error(err.code);
      //     }
      //   });
    }
    // console.log("yassine : " +  this.domiciliationForm.form.value.service);
    // console.log("yassine " + this.authService.currentUserSig()!.uid);


    // console.log("yassine : " +  this.domiciliationForm.form.value.service);
    // console.log("yassine " + this.authService.currentUserSig()!.uid);
    const ClientCollection = collection(this.firestore, 'Clients');
    if (this.user) {
      
      // addDoc(ClientCollection, {
        setDoc (doc(getFirestore(), "Clients", this.domiciliationForm.form.value.Cin.toString()),{
        'service': this.domiciliationForm.form.value.service,
        'pack': this.domiciliationForm.form.value.pack,
        'Forme_Juridique': this.domiciliationForm.form.value.Forme_Juridique,
        'Raison_Sociale': this.domiciliationForm.form.value.Raison_Sociale,
        'Matricule_Fiscale': this.domiciliationForm.form.value.Matricule_Fiscale,
        'Nom': this.domiciliationForm.form.value.Nom,
        'Prénom': this.domiciliationForm.form.value.Prénom,
        'Cin': this.domiciliationForm.form.value.Cin,
        'Date': this.domiciliationForm.form.value.Date,
        'Adresse': this.domiciliationForm.form.value.Adresse,
        'email': this.domiciliationForm.form.value.email,
        'mdp': this.domiciliationForm.form.value.mdp,
        'montant': this.packAmount,
        'owner': this.user
      });
      console.log("hedhy t'executi 2 " + this.user)
    }
    console.log("hedhy t'executi 3 " + this.user)
    // const docRef: CollectionReference<DocumentData, DocumentData> = collection(
    //   this.firestore,
    //   'Clients'
    // );
    // let queryRef;
    // queryRef = query(docRef);
    // queryRef = query(
    //   queryRef,
    //   where("owner", '==', this.user)
    // );
    // const querySnapshot = await getDocs(queryRef);
    // querySnapshot.docs.map((doc) => {
    //   const data = doc.data();
    //   const id = doc.id;
    //   console.log(data, id);
    // })
  }

  resetForm(): void {
    this.domiciliationForm.reset({
      'service': '',
      'pack': '',
      'Forme_Juridique': '',
      'Raison_Sociale': '',
      'Matricule_Fiscale': '',
      'Nom': '',
      'Prénom': '',
      'Cin': '',
      'Date': '',
      'Adresse': '',
      'email': '',
      'mdp': '',
      'montant': '',
    })
  }

  submitForm(): void {
    this.saveData();
    // this.resetForm();
  }
  onPackChange(event: any) {
    console.log("Selected pack:", event.target.value);
    this.packAmount = this.getMontant(event.target.value)
  }
}
