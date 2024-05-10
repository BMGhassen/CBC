import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Firestore, collection, addDoc, FirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FirestoreModule],
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent  {

  submitErr = false;
  submitSucc= false;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  nameControl = new FormControl('', [Validators.required]);
  subjectControl = new FormControl('', [Validators.required]);
  messageControl = new FormControl('', [Validators.required]);
  form: FormGroup = this.formBuilder.group({
    email: this.emailControl,
    name: this.nameControl,
    subject: this.subjectControl,
    message: this.messageControl
  });

  constructor(private formBuilder: FormBuilder, private firestore: Firestore) {}

  async onSubmit(event: Event) {
    if (this.form.valid) {
      // Form is valid, handle submission (e.g., show success alert, send data to Firestore) // Assuming you want to show a success message
      console.log('Form submitted!', this.form.value); // Example logging form data
      const formData = this.form.value; // Extract form data
      try {
        const docRef = await addDoc(collection(this.firestore, 'contact'), formData);
        console.log('Document written with ID:', docRef.id);
        this.form.reset(); // Reset the form after successful submission
        this.submitSucc = true;
        this.submitErr = false;
      } catch (error) {
        console.error('Error adding document: ', error);
      }
      // Your backend interaction logic (e.g., Firestore) goes here
    } else {
      // Form is invalid, show validation errors
      this.submitErr = true;
      this.submitSucc = false;
      console.error('Form is invalid!');
    }
  }
}