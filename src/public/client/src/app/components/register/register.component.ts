import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/app.interfaces';

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

  constructor() { }

  ngOnInit() {
  }

}
