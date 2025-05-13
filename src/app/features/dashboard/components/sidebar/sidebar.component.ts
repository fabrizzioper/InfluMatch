import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  @Input() expanded = true;
  @Input() user: User | null = null;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  navItems: NavItem[] = [
    {
      label: 'DASHBOARD.HOME',
      icon: 'dashboard',
      route: '/dashboard',
      exact: true,
    },
    {
      label: 'DASHBOARD.PROFILE',
      icon: 'person',
      route: '/dashboard/profile',
      exact: false,
    },
    {
      label: 'DASHBOARD.CAMPAIGNS',
      icon: 'campaign',
      route: '/dashboard/campaigns',
      exact: false,
    },
    {
      label: 'DASHBOARD.MESSAGES',
      icon: 'message',
      route: '/dashboard/messages',
      exact: false,
    },
    {
      label: 'DASHBOARD.ANALYTICS',
      icon: 'bar_chart',
      route: '/dashboard/analytics',
      exact: false,
    },
    {
      label: 'DASHBOARD.SETTINGS',
      icon: 'settings',
      route: '/dashboard/settings',
      exact: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
