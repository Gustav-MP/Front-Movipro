import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
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

@Component({
  selector: 'app-adminLogin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class AdminLoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = '';
  apiError = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Debes ingresar un email';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Debe ser un email válido';
    }
  }

  tryLogin() {
    if (this.email.valid) {
      this.apiError = false;
      let userId: number;
      this.email.value === 'gustavo.gutierrez@movipro.cl'
        ? (userId = 1)
        : (userId = 0);
      this.authService.getUser(userId).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/cuentas']);
          console.log(response);
        },
        error: (error) => {
          this.apiError = true;
          console.error('Error fetching user:', error.status);
        },
      });
    }
  }
}
