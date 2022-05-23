import { NgModule }      from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NewUserData } from '../../models/NewUserData' ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: NewUserData = new NewUserData();
  constructor(public service: UserService, private toastr: ToastrService, private _router: Router) { }

  ngOnInit(): void {
    //this.service.formModel.reset();
  }
  onSubmit() {
    this.service.registerUser(this.registerUserData).subscribe(res => {
      localStorage.setItem('token', res.token)
      this.toastr.success('New user created!Please login to continue!', 'Registration successful.');
     
      this._router.navigate(['user/login'])
      
      this.toastr.success('Login to Continue','Registration Successfull')
    },
      err =>{console.log(err)
      this.toastr.error('Please try Again', 'Registration failed.');}
    )
  }
}
