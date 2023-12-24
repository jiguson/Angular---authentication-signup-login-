import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { error } from 'console';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;
  // step 10 : we declare a property in auth ts file that is isLoading it will 
  // put under the if condition to check the condition is true then show the spinner 	

  isLoading = false;

  // step12 : now we have declared a error property in auth.ts file and put in the downwards error condition 
  error: string = null;

  constructor(private authService: AuthService) { }

  // Step 2: We have created two methods to sbmit the data and onSwitchMode method 
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    //step 4:here we have created 2 const variables to storing the data from form 
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;


    let authObs: Observable<AuthResponseData>

    // step 10 : we declare a property in auth ts file that is isLoading it will 
    // put under the if condition to check the condition is true then show the spinner 	

    this.isLoading = true;

    if (this.isLoginMode) {
      //step 16 we add a method of login in auth.ts file 
      authObs = this.authService.login(email, password);
    } else {
      // step 5:here we created a constructor access service file methods and passing the parameter 
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      resdata => {
        console.log(resdata);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();

  }

}