import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  });

  constructor(private userService:UserService,private router: Router,private snackBar: MatSnackBar) {
    
   }

  ngOnInit(): void {
  }

 createUser(){
  this.userService.createNewUser(this.signupForm.value).subscribe(
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

//todo:input validation