// src/app/features/landing/components/presentation/landing/landing.component.ts
import { Component, OnInit, HostBinding } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @HostBinding('class.dark-mode') isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Aplica la clase .dark-mode en el host cuando esté en modo oscuro
    this.isDarkMode = this.themeService.isDark();
    // Opcional: si ThemeService emite cambios, suscríbete y actualiza `isDarkMode`
    this.themeService
      .themeChanges()
      .subscribe((dark) => (this.isDarkMode = dark));
  }
}
