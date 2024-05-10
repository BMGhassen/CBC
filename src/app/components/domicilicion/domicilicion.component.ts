import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Firestore, FirestoreModule, doc, getFirestore, setDoc } from '@angular/fire/firestore';
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
  [x: string]: any;
  static isAccessTokenSet() {
    throw new Error('Method not implemented.');
  }
  domiciliationForm: FormGroup = this.fb.group({
      Nom: ['', Validators.required],
      Prénom: ['', Validators.required],
      Cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      Date: ['', Validators.required],
      Adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      mdpConfirmation: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      pack: ['', Validators.required], // Required field
      Raison_Sociale: ['', Validators.required], // Required field
      Forme_Juridique: ['', Validators.required], // Required field
      Matricule_Fiscale: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Required field with pattern for digits only
    }, { validators: this.passwordsMatchValidator });

  firestore: Firestore = inject(Firestore); 
  authService = inject(AuthService);
  router = inject(Router);

  FieldsetNumber: number;

  user: any;
  isloggedIn: Boolean;
  packAmount: number;
  constructor(private location: Location, private fb: FormBuilder) {
  
    this.packAmount = 0;
    this.FieldsetNumber = 1;
    this.user = localStorage.getItem('uid');

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
         if(this.domiciliationForm.get('pack')?.valid)
          {return true;}
      case 2:
        if(this.domiciliationForm.get('Raison_Sociale')?.valid &&
        this.domiciliationForm.get('Forme_Juridique')?.valid &&
        this.domiciliationForm.get('Matricule_Fiscale')?.valid)
        {return true;}
      case 3:
        if(this.domiciliationForm.get('Nom')?.valid &&
           this.domiciliationForm.get('Prénom')?.valid &&
           this.domiciliationForm.get('Cin')?.valid &&
           this.domiciliationForm.get('Date')?.valid &&
           this.domiciliationForm.get('Adresse')?.valid &&
           this.domiciliationForm.get('email')?.valid &&
           this.domiciliationForm.get('mdp')?.valid &&
           this.domiciliationForm.get('mdpConfirmation')?.valid &&
           this.domiciliationForm.get('terms')?.valid)
           {return true}
      default:
        return true; // No validation for other fieldsets
    }
  }


  nextFieldset(): void {
    console.log("next :" + this.FieldsetNumber, this.isloggedIn)
    if (this.FieldsetNumber < 4 && this.validateCurrentFieldset()) {
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
        'service': this.domiciliationForm.value.service,
        'pack': this.domiciliationForm.value.pack,
        'Forme_Juridique': this.domiciliationForm.value.Forme_Juridique,
        'Raison_Sociale': this.domiciliationForm.value.Raison_Sociale,
        'Matricule_Fiscale': this.domiciliationForm.value.Matricule_Fiscale,
        'Nom': this.domiciliationForm.value.Nom,
        'Prénom': this.domiciliationForm.value.Prénom,
        'Cin': this.domiciliationForm.value.Cin,
        'Date': this.domiciliationForm.value.Date,
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
