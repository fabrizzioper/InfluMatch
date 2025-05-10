// src/app/features/landing/components/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../..//shared/shared.module';

@Component({
  selector: 'app-header',
  standalone: true, // marca como standalone
  imports: [
    SharedModule, // trae CommonModule, RouterModule,
    // TranslateModule, MatToolbarModule, etc.
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDark = false;

  constructor(
    private themeService: ThemeService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isDark();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.themeService.setDark(this.isDark);
  }

  changeLang(lang: 'en' | 'es'): void {
    this.translate.use(lang);
  }
}
