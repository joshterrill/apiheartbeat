import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/app.interfaces';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: Register = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  async doRegister(): Promise<void> {
    try {
      const {ok, token} = await this.appService.register(this.registerForm);
      if (ok && token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      } else {
        console.log('register doRegister no token');
      }
    } catch (error) {
      console.log('register doRegister error', error);
    }
  }

}
