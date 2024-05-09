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

//   contactForm!: FormGroup;
//   name: string = '';
//   email: string = '';
//   subject: string = '';
//   message: string = '';
//  c1=false;c2=false;c3=false;
//   constructor(private firestore: Firestore, private formBuilder: FormBuilder) { }
//   ngOnInit() { 
//     this.contactForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       subject: [''],
//       message: ['', Validators.required]
//     });
//   }
  // Function to check if name field is empty
  // isEmptyName(): boolean {
  //   return this.contactForm.get('name')?.value === '';
  // }

  // Function to check if email field is empty or invalid
  // isInvalidEmail(): any {
  //   const emailControl = this.contactForm.get('email');
  //   return (emailControl?.errors) && (emailControl.dirty || emailControl.touched);
  // }
  // Function to check if message field is empty
  // isEmptyMessage(): boolean {
  //   return this.contactForm.get('message')?.value === '';
  // }
  // async createContact(name: string, email: string, subject: string, message: string) {
  //   if (this.contactForm.valid) {
  //     const name = this.contactForm.value.name;
  //     const email = this.contactForm.value.email;
  //     const subject = this.contactForm.value.subject;
  //     const message = this.contactForm.value.message;

  //     const docRef = await addDoc(collection(this.firestore, 'contact'), {
  //       name,
  //       email,
  //       subject,
  //       message
  //     });
  //     console.log("Document written with ID: ", docRef.id);

  //     // Reset the form after successful submission
  //     this.contactForm.reset();
  //   } else {
  //     console.error('Form is invalid!');
  //     this.c1=this.contactForm.get('name')?.value == '';
  //    // const emailControl = this.contactForm.get('email');
  //     this.c2=this.contactForm.get('email')?.value === '';;
  //   }
  // }
  
}