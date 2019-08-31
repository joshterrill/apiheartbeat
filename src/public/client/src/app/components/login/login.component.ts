import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/app.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: Login = {
    email: '',
    password: '',
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async doLogin(): Promise<void> {
    await this.router.navigate(['/home']);
  }

}
