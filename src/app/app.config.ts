import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import routeConfig from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqQo-r1JjNhMiGXU9TuIIhd4QlO4dbXjc",
  authDomain: "cairusbc.firebaseapp.com",
  projectId: "cairusbc",
  storageBucket: "cairusbc.appspot.com",
  messagingSenderId: "65055148934",
  appId: "1:65055148934:web:c2b1a4e8c87c800bf73a07"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(()=>getAuth()),
        provideFirestore(() => getFirestore()),
    ])
  ]
 };

