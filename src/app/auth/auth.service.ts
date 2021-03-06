import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';


import { Subject } from 'rxjs/Subject';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";

@Injectable()
export class AuthService {
    private isAuthenticated: boolean;

    authChange = new Subject<boolean>();

    constructor(private router: Router,
        private firebaseAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService) { }

    initFirebaseAuthListener() {
        this.firebaseAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }
            else {
                this.trainingService.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/signin']);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);

        this.firebaseAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);

            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false);

                this.uiService.showSnackbar(error.message, null, 3000);
            });
    }

    signIn(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.firebaseAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);

            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false);

                this.uiService.showSnackbar(error.message, null, 3000);
            });
    }

    signOut() {
        this.firebaseAuth.auth.signOut();
    }


    isAuth(): boolean {
        return this.isAuthenticated;
    }
}