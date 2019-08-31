import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/app.interfaces';
import { AppService } from 'src/app/app.service';

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

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  async doLogin(): Promise<void> {
    try {
      const {ok, token} = await this.appService.login(this.loginForm);
      if (ok && token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      } else {
        console.log('register doRegister no token');
      }
    } catch (error) {
      console.log('login doLogin error', error);
    }
  }

}
