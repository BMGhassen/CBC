import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Firestore, FirestoreModule, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, NgForm, AbstractControl, ValidatorFn } from '@angular/forms';
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
  [x: string]: any;
  static isAccessTokenSet() {
    throw new Error('Method not implemented.');
  }

  domiciliationForm: FormGroup = this.fb.group({
      Nom: ['', Validators.required],
      Prénom: ['', Validators.required],
      Cin: ['', [Validators.required, Validators.pattern(/^[0-1]\d{7}$/)]],
      Tel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      Adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      pack: ['', Validators.required], // Required field
      Raison_Sociale: ['', Validators.required], // Required field
      Forme_Juridique: ['', Validators.required], // Required field
      Matricule_Fiscale: ['', [Validators.required, Validators.pattern(/^\d{7}[a-z][abpnd][mncp]\d{3}$/i)]]
    })

    //  matriculeFiscaleValidator(): ValidatorFn {
    //   return (control: AbstractControl): { [key: string]: any } | null => {
    //     const matriculeFiscalePattern = /^\d{7}[abpnd][mncp]\d{3}$/i;
    
    //     if (control.value && !matriculeFiscalePattern.test(control.value)) {
    //       return { 'invalidMatriculeFiscale': true };
    //     }
    
    //     return null;
    //   };
    //  }
    //  get matriculeFiscale() {
    //   return this.domiciliationForm.get('Matricule_Fiscale');
    // }
  firestore: Firestore = inject(Firestore); 
  authService = inject(AuthService);
  router = inject(Router);
  nextset=false;
  FieldsetNumber: number;

  user: any;
  isloggedIn: Boolean;
  packAmount: number;
  constructor(private location: Location, private fb: FormBuilder) {
  
    this.packAmount = 0;
    this.FieldsetNumber = 1;
    this.user = localStorage.getItem('user_uid');

    if (!this.user) {
      this.isloggedIn = false;
    } else {
      this.isloggedIn = true;
    }

  }
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('mdp')?.value;
    const confirmPassword = formGroup.get('mdpConfirmation')?.value;
  
    if (password !== confirmPassword) {
      formGroup.get('mdpConfirmation')?.setErrors({ passwordsNotMatch: true });
    } else {
      formGroup.get('mdpConfirmation')?.setErrors(null);
    }
  
    return null;
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
                (this.domiciliationForm.get('Matricule_Fiscale')?.valid ?? false)
  
      case 3:
        // Check for all fields in fieldset 3 (all have validators)
        return this.domiciliationForm.valid;
  
      default:
        return true; // No validation for other fieldsets
    }
  }

  nextFieldset(): void {
    
    console.log(this.isloggedIn);
    if (this.FieldsetNumber < 4 && this.validateCurrentFieldset()) {
      this.nextset = false;
      if (this.FieldsetNumber == 2  && this.isloggedIn == true) {
        this.FieldsetNumber = 4;
      } else {
        this.FieldsetNumber++;
        console.log("next :" + this.FieldsetNumber)
      } 
    }else {this.nextset = true;}
  }

  prevFieldset(): void {
    console.log("prev :" + this.FieldsetNumber, this.isloggedIn)

    if (this.FieldsetNumber >= 2) {
      this.FieldsetNumber--;
      this.nextset = true
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
      // console.log(this.domiciliationForm.value.service,
      // this.domiciliationForm.value.pack,
      // this.domiciliationForm.value.Forme_Juridique,
      // this.domiciliationForm.value.Raison_Sociale,
      // this.domiciliationForm.value.Matricule_Fiscale,
      // this.domiciliationForm.value.Nom,
      // this.domiciliationForm.value.Prénom,
      // this.domiciliationForm.value.Cin,
      // this.domiciliationForm.value.Date,
      // this.domiciliationForm.value.Adresse,
      // this.domiciliationForm.value.email,
      // this.domiciliationForm.value.mdp,
      // this.packAmount,
      // this.user);
      console.log('Service : '+this.domiciliationForm.value.service);
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
        'montant': this.packAmount,
        'owner': this.user
      });
      console.log("hedhy t'executi 2 " + this.user)
    }
    console.log("hedhy t'executi 3 " + this.user)
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
