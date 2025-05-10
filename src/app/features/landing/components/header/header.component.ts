import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '../../../../core/services/theme.service';

interface NavItem {
  label: string;
  route: string;
  section: string;
  exact: boolean;
  icon?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDark = false;
  isScrolled = false;
  isMobileMenuOpen = false;
  currentLang = 'en';

  navItems: NavItem[] = [
    {
      label: 'HEADER.HOME',
      route: '/',
      section: 'home',
      exact: true,
      icon: 'home',
    },
    {
      label: 'HEADER.HOW_IT_WORKS',
      route: '/',
      section: 'how-it-works',
      exact: false,
      icon: 'help_outline',
    },
    {
      label: 'HEADER.SUCCESS_CASES',
      route: '/',
      section: 'success-cases',
      exact: false,
      icon: 'star_outline',
    },
    {
      label: 'HEADER.PLANS',
      route: '/',
      section: 'plans',
      exact: false,
      icon: 'payments',
    },
    {
      label: 'HEADER.CONTACT',
      route: '/',
      section: 'contact',
      exact: false,
      icon: 'mail_outline',
    },
  ];

  constructor(
    private themeService: ThemeService,
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isDark();
    this.currentLang = this.translate.currentLang || 'en';
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.themeService.setDark(this.isDark);
  }

  changeLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevent scrolling when mobile menu is open
    if (this.isMobileMenuOpen) {
      this.document.body.classList.add('no-scroll');
    } else {
      this.document.body.classList.remove('no-scroll');
    }
  }

  scrollToSection(sectionId: string): void {
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  mobileNavClick(sectionId: string): void {
    this.toggleMobileMenu();
    setTimeout(() => {
      this.scrollToSection(sectionId);
    }, 300);
  }
}
