import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidebarExpanded = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'es';
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  changeLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
