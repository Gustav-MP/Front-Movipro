import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMessage = '';
  apiError = false;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async tryLogin() {
    this.errorMessage = '';
    this.apiError = false;
    if (this.email.valid && this.password.valid) {
      try {
        const responseRole = await this.authService.login(
          this.email.value!,
          this.password.value!,
        );
        responseRole === 'admin'
          ? this.router.navigate(['/admin/cuentas'])
          : this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.errorMessage = error.message || 'Error desconocido';
        this.apiError = true;
        this.email.setErrors({});
        this.password.setErrors({});
      }
    }
  }
}
