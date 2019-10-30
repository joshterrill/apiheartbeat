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

  error: string = '';
  loading: boolean = false;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  async doRegister(): Promise<void> {
    try {
      this.error = '';
      if (this.validateForm()) {
        this.loading = true;
        const {ok, token, error} = await this.appService.register(this.registerForm);
        this.loading = false;
        if (ok && token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        } else {
          this.error = error;
        }
      } else {
        this.error = 'Please fill out all fields and ensure passwords match';
      }
    } catch (error) {
      this.loading = false;
      this.error = error && error.message ? error.message : 'An unexpected error has occurred, please contact support';
    }
  }

  private validateForm(): boolean {
    return (this.registerForm.email && this.registerForm.password && this.registerForm.confirmPassword) &&
      (this.registerForm.password === this.registerForm.confirmPassword) &&
      (this.registerForm.password !== '' && this.registerForm.confirmPassword !== '');
  }

}
