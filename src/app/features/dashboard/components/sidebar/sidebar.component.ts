import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state(
        'expanded',
        style({
          width: '250px',
        })
      ),
      state(
        'collapsed',
        style({
          width: '70px',
        })
      ),
      transition('expanded <=> collapsed', [
        animate('0.25s cubic-bezier(0.25, 1, 0.5, 1)'),
      ]),
    ]),
    trigger('fadeInOut', [
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateX(10px)',
          display: 'none',
        })
      ),
      transition('visible <=> hidden', [
        animate('0.2s cubic-bezier(0.25, 1, 0.5, 1)'),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  user: any = null;
  isExpanded = true;
  isMobile = false;
  isMobileMenuOpen = false;
  tooltipVisible = false;
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isExpanded = false;
    }
  }

  toggleSidebar() {
    if (!this.isMobile) {
      this.isExpanded = !this.isExpanded;
    } else {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  }

  closeMobileMenu() {
    if (this.isMobile) {
      this.isMobileMenuOpen = false;
    }
  }

  showTooltip(event: MouseEvent, text: string) {
    if (!this.isExpanded) {
      this.tooltipText = text;
      this.tooltipX = event.clientX + 15;
      this.tooltipY = event.clientY;
      this.tooltipVisible = true;
    }
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
