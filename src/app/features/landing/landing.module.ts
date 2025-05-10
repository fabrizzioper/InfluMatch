// src/app/features/landing/landing.module.ts
import { NgModule } from '@angular/core';
import { LandingComponent } from './components/presentation/landing/landing.component';
// ...otros imports
@NgModule({
  declarations: [
    LandingComponent,
    // ...tus otros componentes
  ],
  imports: [
    // CommonModule, Material, TranslateModule, LandingRoutingModule, etc.
  ],
})
export class LandingModule {}
