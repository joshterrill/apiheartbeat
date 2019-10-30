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

  error: string = '';
  loading: boolean = false;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  async doLogin(): Promise<void> {
    try {
      this.error = '';
      this.loading = true;
      const {ok, token, error} = await this.appService.login(this.loginForm);
      this.loading = false;
      if (ok && token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      } else if (error) {
        this.error = error;
      } else {
        this.error = 'An unexpected error has occurred, please contact support';
      }
    } catch (error) {
      this.loading = false;
      this.error = error && error.message ? error.message : 'An unexpected error has occurred, please contact support';
    }
  }

}
