import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
  user_type: string;
  profile_completed: boolean;
  avatar_url?: string;
  display_name?: string;
  bio?: string;
  location?: string;

  // Campos específicos de influencer
  niche?: string;
  followers?: {
    instagram: number;
    tiktok: number;
    youtube: number;
  };
  rate_per_post?: number;
  engagement_rate?: string;

  // Campos específicos de marca
  sector?: string;
  budget_range?: string;
  objectives?: string;

  // Campos comunes adicionales
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
  };
}

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error = false;
  currentUserType = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.currentUserType = currentUser.user_type || '';
      this.loadUsers();
    }
  }

  loadUsers(): void {
    // Determinar qué tipo de usuarios cargar (opuesto al tipo del usuario actual)
    const userTypeToLoad =
      this.currentUserType === 'influencer' ? 'marca' : 'influencer';

    this.http
      .get<User[]>(
        `https://68226283b342dce8004e1b82.mockapi.io/users-register?user_type=${userTypeToLoad}`
      )
      .subscribe(
        (data) => {
          // Filtrar solo usuarios con perfil completo
          this.users = data.filter((user) => user.profile_completed);
          this.loading = false;
        },
        (error) => {
          console.error('Error loading users:', error);
          this.loading = false;
          this.error = true;
          this.snackBar.open(
            'Error al cargar los usuarios. Intenta de nuevo más tarde.',
            'Cerrar',
            {
              duration: 5000,
            }
          );
        }
      );
  }

  getFollowersTotal(followers?: {
    instagram: number;
    tiktok: number;
    youtube: number;
  }): number {
    if (!followers) return 0;
    return (
      (followers.instagram || 0) +
      (followers.tiktok || 0) +
      (followers.youtube || 0)
    );
  }

  formatFollowers(count: number): string {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }

  getDefaultAvatar(): string {
    return 'assets/images/default-avatar.png';
  }

  getSocialLink(platform: string, username: string | undefined): string {
    if (!username) return '';

    switch (platform) {
      case 'instagram':
        return `https://instagram.com/${username}`;
      case 'facebook':
        return `https://facebook.com/${username}`;
      case 'tiktok':
        return `https://tiktok.com/@${username}`;
      case 'youtube':
        return `https://youtube.com/${username}`;
      case 'twitter':
        return `https://twitter.com/${username}`;
      default:
        return '';
    }
  }

  hasSocialLinks(user: User): boolean {
    if (!user.social_links) return false;

    return Object.values(user.social_links).some((link) => !!link);
  }
}
