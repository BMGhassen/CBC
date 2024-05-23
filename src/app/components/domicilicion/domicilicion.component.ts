import { CommonModule } from '@angular/common';
import { Firestore, FirestoreModule, doc, getFirestore, setDoc, where } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { myCustomConstant } from '../../../gVar';
import {  getDocs,query, getCountFromServer } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getStorage, ref, uploadString } from 'firebase/storage';

@Component({
  selector: 'app-domicilicion',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, FirestoreModule],
  templateUrl: './domicilicion.component.html',
  styleUrls: ['./domicilicion.component.css'],
})
export class DomicilicionComponent implements OnInit {
  firestore: Firestore = inject(Firestore); 
  authService = inject(AuthService);
  router = inject(Router);
  // angularFireStorage= inject(AngularFireStorage);
  nextset=false;
  FieldsetNumber: number;
  price=0;
  price1 = 0;
  user: any;
  isloggedIn: Boolean;
  offre='';
  tt='';
  mdpnot=false;
  constructor(private location: Location, private fb: FormBuilder, private route: ActivatedRoute) {
    this.FieldsetNumber = 1;
    this.user = localStorage.getItem('user_uid');

    if (!this.user) {
      this.isloggedIn = false;
    } else {
      this.isloggedIn = true;
    }
  }

  
  ngOnInit() {
    this.getBlogArray1();
  }
  
  [x: string]: any;
  static isAccessTokenSet() {
    throw new Error('Method not implemented.');
  }
  async getBlogArray1():Promise<void> {
  
    const db=getFirestore();
    
    const bundleRef = collection( db, "bundles");
    // console.log(myCustomConstant.myCustomProperty!='original value');
    if (myCustomConstant.myCustomProperty!='original value')
      {
        localStorage.setItem(this.tt, myCustomConstant.myCustomProperty);
      }
      
       const t1=localStorage.getItem(this.tt);

      const q1 = query(bundleRef, where("title", "==",t1));
     
      const nompr1 = await getDocs(q1);
      
      // console.log("A"+t1);
      nompr1.forEach((doc) => {
     
      this.price1 = doc.data()['prix'] ;
      this.offre = t1!;

      console.log(this.offre);
      }); 
    
}
  domiciliationForm: FormGroup = this.fb.group({
      Nom: ['', Validators.required],
      Prénom: ['', Validators.required],
      Cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      Tel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      Adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      // confirmmdp:['', Validators.required],
      terms: [false, Validators.requiredTrue],
      pack: ['', Validators.required], 
      Raison_Sociale: ['', Validators.required], 
      Forme_Juridique: ['', Validators.required], 
      Matricule_Fiscale: ['', [Validators.required, Validators.pattern(/^\d{7}[a-z][abpnd][mncp]\d{3}$/i)]]
    })
    showPassword = false;
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
    
  
  private validateCurrentFieldset(): boolean {
    // Check validity of current fieldset based on FieldsetNumber
    switch (this.FieldsetNumber) {
      case 1:
        // Check for required fields in fieldset 1
        return this.domiciliationForm.get('pack')?.valid ?? false;
  
      case 2:
        // Check for required fields in fieldset 2
        return (this.domiciliationForm.get('Forme_Juridique')?.valid ?? false) &&
                (this.domiciliationForm.get('Raison_Sociale')?.valid ?? false) &&
                (this.domiciliationForm.get('Matricule_Fiscale')?.valid ?? false) ;
  
      case 3:
        
        return (this.domiciliationForm.get('Nom')?.valid ?? false) && 
               (this.domiciliationForm.get('Prénom')?.valid ?? false) &&
               (this.domiciliationForm.get('Cin')?.valid ?? false) &&
               (this.domiciliationForm.get('Tel')?.valid ?? false) &&
               (this.domiciliationForm.get('Adresse')?.valid ?? false) &&
               (this.domiciliationForm.get('email')?.valid ?? false) &&
               (this.domiciliationForm.get('mdp')?.valid ?? false) &&
               (this.domiciliationForm.get('confirmmdp')?.valid ?? false) ;
      default:
        return true; // No validation for other fieldsets
    }
  }

  nextFieldset(): void {
    
    console.log(this.isloggedIn);
    if (this.FieldsetNumber <= 4 && this.validateCurrentFieldset()) {
      this.nextset = false;
      
        this.FieldsetNumber++;
        console.log("next :" + this.FieldsetNumber)
      
    }else {this.nextset = true;}
  }

  prevFieldset(): void {
    console.log("prev :" + this.FieldsetNumber, this.isloggedIn)

    if (this.FieldsetNumber >= 2) {
      this.FieldsetNumber--;
      this.nextset = true
    }
  }


  getMontant():number {
  
    var prixprix=0;
    switch (this.domiciliationForm.value.pack) {
     
      
      case "Trimestriel" :
        prixprix = this.price1*3;
        break;
      case "Semestriel" :
          prixprix = this.price1*6;
          break;
      case "Annuel" :
        prixprix = this.price1*12;
        break;
      case "Bi-Annuel" :
        prixprix = this.price1*24;
        break;
       default :
       prixprix = 0;
       
    }
    this.price=prixprix;
    console.log(this.price);
     return prixprix;
  }
  success = false;
  async saveData(): Promise<Boolean> {

    if (this.isloggedIn === false && !this.user) {
      const response = await this.authService.register(
        this.domiciliationForm.value.email,
        this.domiciliationForm.value.Nom + this.domiciliationForm.value.Prénom,
        this.domiciliationForm.value.mdp
      ).toPromise();
  
      const accessToken = response?.user?.accessToken;
      const userUid = response?.user?.uid;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user_uid', userUid);
      this.user = userUid;
      
    }
    
    const ClientCollection = collection(this.firestore, 'Clients');
    if (this.user) {
      // addDoc(ClientCollection, {
        setDoc (doc(getFirestore(), "Clients", this.domiciliationForm.value.Cin.toString()),{
        'pack': this.domiciliationForm.value.pack,
        'Forme_Juridique': this.domiciliationForm.value.Forme_Juridique,
        'Raison_Sociale': this.domiciliationForm.value.Raison_Sociale,
        'Matricule_Fiscale': this.domiciliationForm.value.Matricule_Fiscale,
        'Nom': this.domiciliationForm.value.Nom,
        'Prénom': this.domiciliationForm.value.Prénom,
        'Cin': this.domiciliationForm.value.Cin,
        'Tel': this.domiciliationForm.value.Tel,
        'Adresse': this.domiciliationForm.value.Adresse,
        'email': this.domiciliationForm.value.email,
        'mdp': this.domiciliationForm.value.mdp,
        'montant': this.price,
        'owner': this.user,
        'offre':this.offre,
      });
      console.log("hedhy t'executi 2 " + this.user)
    }
    console.log("hedhy t'executi 3 " + this.user)
    return this.success = true;
  }

  resetForm(): void {
    this.domiciliationForm.reset({
      'pack': '',
      'Forme_Juridique': '',
      'Raison_Sociale': '',
      'Matricule_Fiscale': '',
      'Nom': '',
      'Prénom': '',
      'Cin': '',
      'Tel': '',
      'Adresse': '',
      'email': '',
      'mdp': '',
      'montant': '',
      'offre':'this.offre',
    })
  }
  async createFolderForClient(ownerUid: string) {
    // Get a reference to the Firebase Storage service
    const storage = getStorage();

    // Construct the path for the folder
    const folderPath = 'clients/'+ownerUid+'/';
    console.log(folderPath)
    // Create a reference to the folder
    const folderRef = ref(storage, folderPath);
    const ghostFile = ref(folderRef, '.ghostfile')
        
    try {
        // Upload a dummy file to create the folder
        await uploadString(ghostFile, '')

        console.log('Folder created successfully');

        return true; // Return true to indicate success
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error; // Re-throw the error for handling in the component
    }
}

  // async createFolderForClient(ownerUid: string) {
  //   const storageRef = this.angularFireStorage.ref(`clients/${ownerUid}`);
  
  //   // Check if folder already exists (optional)
  //   // try {
  //   //   await storageRef.listAll().toPromise();
  //   //   console.log('Folder already exists');
  //   // } catch (error) {
  //   //   if (error.code === 'storage/object-not-found') {
  //   //     console.log('Creating folder...');
  //   //   } else {
  //   //     console.error('Error checking folder:', error);
  //   //     throw error;
  //   //   }
  //   // }
  
  //   // Create the folder (folder creation is implicit when uploading a file)
  //   try {
  //     await storageRef.put(null); // Uploading an empty file creates the folder
  //     console.log('Folder created successfully');
  //   } catch (error) {
  //     console.error('Error creating folder:', error);
  //     throw error; // Re-throw the error for handling in the component
  //   }
  
  //   // Save your data to Firestore with ownerUid
  //   // ... your Firestore logic to save data with ownerUid
  
  //   return true; // Or handle success/failure differently
  // }

  async submitForm(): Promise<void> {
    await this.saveData();
    const ownerUid = this.user; // Replace with the actual ownerUid
    try {
      await this.createFolderForClient(ownerUid);
      console.log('Folder created successfully');
    } catch (error) {
      console.error('Error creating folder:', error);
      // Handle error gracefully (e.g., display error message to user)
    }
    if(this.success == true){
    this.FieldsetNumber = 4;
    }// this.resetForm();
    
  }
  
}
