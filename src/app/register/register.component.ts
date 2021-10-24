import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MustMatch } from './matchpwd.validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
      signupForm!:FormGroup;
   
  constructor(private userService:UserService,private router: Router,private snackBar: MatSnackBar,private fb:FormBuilder) {

   }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      pwd: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(3)]],
        password2: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'password2')
    })
  });
   
}
  

 createUser(){
   if(this.signupForm.valid){
    this.userService.createNewUser({
      name:this.signupForm.value.name,
      email:this.signupForm.value.email,
      password:this.signupForm.value.pwd.password,
      role:"user"
    }).subscribe(
      (data: any) => {
        this.userService.setUserDate(data);
         this.router.navigate([ '/' ]);
      },
      (err: HttpErrorResponse) => {
        if (err.error.error.message) {
          this.snackBar.open(err.error.error.message);
        } else {
          this.snackBar.open('Something Went Wrong!');
        }
      }
    );
   }
 
 }


}

