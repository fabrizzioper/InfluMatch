// src/app/core/core.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthRepository } from '../domain/repositories/auth-repository';
import { AuthRepositoryImpl } from '../infrastructure/repositories/auth.repository';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: AuthRepository, useClass: AuthRepositoryImpl }, // ← vínculo
  ],
})
export class CoreModule {}
