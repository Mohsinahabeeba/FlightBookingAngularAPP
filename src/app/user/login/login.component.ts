import { NgModule }      from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserData } from '../../models/UserData';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginUserData: UserData = new UserData();
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    
    this.service.loginUser(this.loginUserData).subscribe(res => {
      localStorage.setItem('userId', res.userId)
      localStorage.setItem('roleId', res.roleId)
      localStorage.setItem('token', res.token)
      if (localStorage.getItem('roleId') == "2")
        this.router.navigate(['/bookingmanagement/searchflights'])
      else if (localStorage.getItem('roleId') == "1")
        this.router.navigate(['/manageinventory/addairlines'])

        this.toastr.success('Welcome','Login Successfull')
    },
      err => {if (err.status == 400)
        this.toastr.error('Incorrect username or password.', 'Authentication failed.');
      else
      this.toastr.error('Incorrect username or password.', 'Authentication failed.');
      }
    )
  
  }
}
