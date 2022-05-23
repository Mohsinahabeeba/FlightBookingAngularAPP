import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router";
import { NewUserData } from '../models/NewUserData';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private _router: Router) { }
  readonly BaseURI = 'http://localhost:5546/api/airline/register';



   loginUser(user: any) {
        return this.http.post<any>('http://localhost:26682/api/admin/login', user)
    }

    registerUser(user: NewUserData) {
        console.log(user);
        return this.http.post<any>('http://localhost:5546/api/airline/register', user)
    }

    logoutUser() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('roleId')
        this._router.navigate(['/user/login'])
    }

    getToken() {
        return localStorage.getItem('token')
    }
    loggedIn() {
        return !!localStorage.getItem('token')
    }

    adminLoggedIn() {
        if (!!localStorage.getItem('token') && localStorage.getItem('roleId') == "1")
            return true;
        else
            return false;
    }

    userLoggedIn() {
        if (!!localStorage.getItem('token') && localStorage.getItem('roleId') == "2")
            return true;
        else
            return false;
    }
}
