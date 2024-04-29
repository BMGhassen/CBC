import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-domicilicion',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, FirestoreModule],
  templateUrl: './domicilicion.component.html',
  styleUrls: ['./domicilicion.component.css'],
})
export class DomicilicionComponent  {
  @ViewChild("DomiForm") domiciliationForm: any; // Use type assertion for FormGroup
  firestore: Firestore = inject(Firestore);

  

  constructor(private formBuilder: FormBuilder) {}
  getMontant() {
    const pack = this.domiciliationForm.get('pack')?.value;
    if (pack === 'basic') {
      return 100;
    } else if (pack === 'premium') {
      return 200;
    } else {
      return 0; // Or set a default value if no pack is selected
    }
  }
  saveData(): void {
    const ClientCollection = collection(this.firestore, 'Clients');
    const montant = this.getMontant(); // Call function to calculate montant
    addDoc(ClientCollection, {
      'service': this.domiciliationForm.value.service,
      'pack':this.domiciliationForm.value.pack,
      'Forme_Juridique':this.domiciliationForm.value.Forme_Juridique,
      'Raison_Sociale':this.domiciliationForm.value.Raison_Sociale,
      'Matricule_Fiscale':this.domiciliationForm.value.Matricule_Fiscale,
      'Nom':this.domiciliationForm.value.Nom,
      'Prénom':this.domiciliationForm.value.Prénom,
      'Cin':this.domiciliationForm.value.Cin,
      'Date':this.domiciliationForm.value.Date,
      'Adresse':this.domiciliationForm.value.Adresse,
      'email':this.domiciliationForm.value.email,
      'mdp':this.domiciliationForm.value.mdp,
      'montant':this.domiciliationForm.value.montant,
    });
  }

  resetForm(): void {
    this.domiciliationForm.reset({
    'service': '',
    'pack':'',
    'Forme_Juridique':'',
    'Raison_Sociale':'',
    'Matricule_Fiscale':'',
    'Nom':'',
    'Prénom':'',
    'Cin':'',
    'Date':'',
    'Adresse':'',
    'email':'',
    'mdp':'',
    'montant':'',})
  }

  submitForm(): void {
    this.saveData();
    this.resetForm();
  }
  onPackChange(event: any) {
    console.log("Selected pack:", event.target.value);
  }
}
