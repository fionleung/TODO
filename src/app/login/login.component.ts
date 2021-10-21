import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
 
  loginUser(){
    if ( this.loginForm.valid ){
      this.userService.login(this.loginForm.value).subscribe(
        (data: any) => {
          
          this.userService.setUserDate(data);
          this.router.navigate([ '/' ]);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error.msg) {
            this.snackBar.open(err.error.msg);
          } else {
            this.snackBar.open('Something Went Wrong!');
          }
        }
      );
    }
  
  }

}
