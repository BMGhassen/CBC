import { Injectable, inject, signal } from "@angular/core";
import { getAuth , Auth, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, updateProfile, user } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "./user.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth)
    currentUserSig = signal<UserInterface | null | undefined>(undefined)

    register(email: string, username: string, password: string): Observable<any> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password,
         )//.then(async (response) => {
        //     await updateProfile(response.user, { displayName: username });
        //     console.log(response);
        // }).catch((error) => {
        //     console.error('Error creating user:', error);
        // });
        //    ).then(response => 
        //        updateProfile(response.user, { displayName: username  }), 
        //     );

        return from(promise);
    }
    login(email: string, password: string): Observable<any> {
        // const promise = setPersistence(this.auth, browserLocalPersistence)
        //     .then(() => {
        //         return signInWithEmailAndPassword(this.auth, email, password);
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //     });
        // return from(promise);
           const promise = signInWithEmailAndPassword(
               this.firebaseAuth,
               email,
               password,
           )/*.then(() => {})*/;
           return from(promise);
    }

    async logout() {
        await this.firebaseAuth.signOut();
        // Optionally, clear any stored user data in localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user_uid');
      }
}