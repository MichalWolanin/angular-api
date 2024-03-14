import { Injectable, inject, signal } from "@angular/core";
import { Auth, signInWithEmailAndPassword, user } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { response } from "express";
import { Observable, from } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth);
    currentUserSignal = signal<UserInterface | null | undefined>(undefined);

    register(
        email: string,
        username: string,
        password: string,
        ): Observable<void> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password,
            ).then(response => updateProfile(response.user, {displayName: username}),
            );

            return from(promise);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password,
        ).then(() => {});
        return from(promise);
    }
}