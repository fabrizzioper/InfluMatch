import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './components/header/header.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { SuccessCasesComponent } from './components/success-cases/success-cases.component';
import { PlansComponent } from './components/plans/plans.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from '../../core/services/theme.service';
import { HeroComponent } from './presentation/hero/hero.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    HeaderComponent,
    HeroComponent,
    HowItWorksComponent,
    SuccessCasesComponent,
    PlansComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @HostBinding('class.dark-mode') isDark = false;

  constructor(private theme: ThemeService) {}

  ngOnInit() {
    this.isDark = this.theme.isDark();
    this.theme.themeChanges().subscribe((d) => (this.isDark = d));
  }
}
