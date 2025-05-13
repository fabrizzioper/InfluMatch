import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  @Input() sidebarExpanded = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  currentLang = 'es';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.currentLang = this.translateService.currentLang || 'es';
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLang = lang;
  }
}
