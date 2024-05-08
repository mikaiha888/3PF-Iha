import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataInput } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup | undefined;

  dataInputs: DataInput[] = [];

  constructor(private formBuilder: FormBuilder, private _auth: AuthService) {}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      password: ['', [Validators.required]],
    });
    this.dataInputs = this._auth.getDataInputs();
  }

  hasError(input: string, errorType: string): boolean | undefined {
    const control = this.loginForm?.get(input);
    if (!control) return false;
    if (control.touched && control.hasError(errorType)) return true;
    if (input === 'email' && control.touched && control.errors?.['pattern']) return true;
    return false;
  }

  onSubmit(): void {
    if (this.loginForm?.valid) {
      this._auth.login(this.loginForm.getRawValue());
    } else {
      this.loginForm?.markAllAsTouched();
    }
  }
}
