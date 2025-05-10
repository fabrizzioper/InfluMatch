import { Component, type OnInit, HostListener } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDark = false;
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(
    private themeService: ThemeService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isDark();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.themeService.setDark(this.isDark);
  }

  changeLang(lang: 'en' | 'es'): void {
    this.translate.use(lang);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
