import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    changeEmailForm: FormGroup;
    changePasswordForm: FormGroup;

    constructor() { }

    ngOnInit() {
        this.initializeForms();
    }

    initializeForms() {
        this.changeEmailForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
        this.changePasswordForm = new FormGroup({
            currentPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required]),
            confirmNewPassword: new FormControl('', [Validators.required]),
        });
    }

    doChangeEmail() {
        console.log(this.changeEmailForm);
    }

    doChangePassword() {
        console.log(this.changePasswordForm);
    }

}
