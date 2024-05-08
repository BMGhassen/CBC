import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FirestoreModule],
  templateUrl: './contact-admin.component.html',
  styleUrl: './contact-admin.component.css'
})
export class ContactAdminComponent implements OnInit{
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
   
  }
  onSubmit() {
    const contactData = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };
      this.firestore.collection('contact').add(contactData)
      .then(() => {
        console.log('Contact data submitted successfully!');
        // Clear the form after successful submission (optional)
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      })
      .catch((error: any) => {
        console.error('Error submitting contact data:', error);
      });
  }
  }

  
