import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBqQo-r1JjNhMiGXU9TuIIhd4QlO4dbXjc",
    authDomain: "cairusbc.firebaseapp.com",
    projectId: "cairusbc",
    storageBucket: "cairusbc.appspot.com",
    messagingSenderId: "65055148934",
    appId: "1:65055148934:web:c2b1a4e8c87c800bf73a07"
  };
bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routeConfig),
        provideHttpClient(),
        importProvidersFrom([
            provideFirebaseApp(() => initializeApp(firebaseConfig)),
            provideAuth(()=>getAuth()),
          ])
    ]
}).catch((err) => console.error(err));
