import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup | undefined;

  dataInputs = [
    {
      name: 'email',
      type: 'email',
      iconName: 'mail',
      placeholder: 'Email',
      errors: {
        required: 'Email es requerido',
        email: 'Email inválido',
      },
    },
    {
      name: 'password',
      type: 'password',
      iconName: 'lock-keyhole',
      placeholder: 'Password',
      errors: {
        required: 'Password es requerido',
      },
    },
  ];

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
