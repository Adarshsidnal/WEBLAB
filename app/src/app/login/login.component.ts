import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) { }

  loginData = {
    email: '',
    password: ''
  };

  login() {
    if (this.loginData.email === "Adarsh" && this.loginData.password === "Ada") {
      alert("Login Successfull");
      this.router.navigate(['/shop']);
    } else {
      alert("Invalid");
   }
    console.log('Login Data:', this.loginData);
  }
}
