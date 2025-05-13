import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { LoginUseCase } from '../../../../application/use-cases/login.usecase';
import { AuthService } from '../../../../core/services/auth.service';
import { UserCredentials } from '../../../../domain/value-objects/user-credentials.vo';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  hide = true;
  isDark = false;
  private themeSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private loginUC: LoginUseCase,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar,
    private theme: ThemeService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.isDark = this.theme.isDark();
    this.themeSubscription = this.theme.themeChanges().subscribe((isDark) => {
      this.isDark = isDark;
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const creds = this.form.value as UserCredentials;

    this.loginUC.execute(creds).subscribe((user) => {
      if (user) {
        this.auth.save(user);
        this.router.navigateByUrl('/');
      } else {
        this.snack.open('Credenciales incorrectas', 'Cerrar', {
          duration: 2500,
        });
      }
    });
  }
}
