import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresin: string;
    localId: string;
    registered?: string;
}


@Injectable({
    providedIn: "root"
})

// Step 3: We have created a service file to create a singup request body and also 
// created authresponsedata to see in which form the data is coming 

export class AuthService {
    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPpMTuZmgde2rKG1DgVLBoM5gjd4ug3Wk',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            // step 13 : Now we have started error handling concept to show the errors with a pipe statement in servvice file
        ).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error Occured ';

            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }

            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = "This email exists already";
            }
            return throwError(errorMessage);
        }));
    }

    // step 15: Now we will see the login requests(Sign in requests) first we will add the method of login in service file

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPpMTuZmgde2rKG1DgVLBoM5gjd4ug3Wk',
            {
                email: email,
                password: password,
                returnsecuretoken: true

            })
    }
}