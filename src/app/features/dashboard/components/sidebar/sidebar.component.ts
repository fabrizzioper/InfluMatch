import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../../../domain/entities/user.entity';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  exact: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() expanded = true;
  @Input() user: User | null = null;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  navItems: NavItem[] = [
    {
      label: 'DASHBOARD.MENU.HOME',
      icon: 'dashboard',
      route: '/dashboard',
      exact: true,
    },
    {
      label: 'DASHBOARD.MENU.PROFILE',
      icon: 'person',
      route: '/dashboard/profile',
      exact: false,
    },
    {
      label: 'DASHBOARD.MENU.SETTINGS',
      icon: 'settings',
      route: '/dashboard/settings',
      exact: false,
    },
  ];

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
