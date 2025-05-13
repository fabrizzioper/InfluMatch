import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RegisterUseCase } from '../../../../application/use-cases/register.usecase';
import { AuthService } from '../../../../core/services/auth.service';
import { NewUserVO } from '../../../../domain/value-objects/new-user.vo';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="name" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Contraseña</mat-label>
        <input matInput formControlName="password" type="password" required />
      </mat-form-field>

      <button mat-flat-button color="primary" [disabled]="form.invalid">
        Registrarme
      </button>
    </form>
  `,
})
export class RegisterComponent {
  // 1️⃣ Declaramos la propiedad sin inicializar
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerUC: RegisterUseCase,
    private auth: AuthService,
    private router: Router
  ) {
    // 2️⃣ La inicializamos DENTRO del constructor, cuando fb ya existe
    this.form = this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol_type: ['Developer'],
    });
  }

  submit() {
    if (this.form.invalid) return;

    // 3️⃣  getRawValue() ⇒ todas las props son non-nullable
    const data: NewUserVO = this.form.getRawValue();

    this.registerUC.execute(data).subscribe((user) => {
      this.auth.save(user); // inicia sesión
      this.router.navigateByUrl('/');
    });
  }
}
