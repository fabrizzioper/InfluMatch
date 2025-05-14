import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../../core/services/auth.service';
import { GetUsersUseCase } from '../../../../application/use-cases/get-users.usecase';
import { User } from '../../../../domain/entities/user.entity';
import { Influencer } from '../../../../domain/entities/influencer.entity';
import { Brand } from '../../../../domain/entities/brand.entity';

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
  ],
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit {
  users: User[] = [];
  currentUserType: 'influencer' | 'marca' = 'influencer';
  loading = true;
  error = false;

  constructor(
    private authService: AuthService,
    private getUsersUseCase: GetUsersUseCase
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.currentUserType = currentUser.user_type as 'influencer' | 'marca';
      this.loadUsers();
    }
  }

  loadUsers(): void {
    this.loading = true;
    this.error = false;

    if (this.currentUserType === 'influencer') {
      this.getUsersUseCase.getBrands().subscribe(
        (brands) => {
          this.users = brands;
          this.loading = false;
        },
        (error) => {
          console.error('Error loading brands:', error);
          this.error = true;
          this.loading = false;
        }
      );
    } else {
      this.getUsersUseCase.getInfluencers().subscribe(
        (influencers) => {
          this.users = influencers;
          this.loading = false;
        },
        (error) => {
          console.error('Error loading influencers:', error);
          this.error = true;
          this.loading = false;
        }
      );
    }
  }

  getDefaultAvatar(): string {
    return 'assets/images/default-avatar.png';
  }

  getSocialLink(platform: string, username: string | undefined): string {
    if (!username) return '#';

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
        return `https://${platform}.com/${username}`;
    }
  }

  hasSocialLinks(user: User): boolean {
    return !!(
      user.social_links &&
      (user.social_links.instagram ||
        user.social_links.facebook ||
        user.social_links.tiktok ||
        user.social_links.youtube ||
        user.social_links.twitter)
    );
  }

  isInfluencer(user: User): user is Influencer {
    return user.user_type === 'influencer';
  }

  isBrand(user: User): user is Brand {
    return user.user_type === 'marca';
  }

  formatFollowers(count: number | undefined): string {
    if (!count) return '0';

    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }

  getFollowersTotal(followers: any): number {
    if (!followers) return 0;

    let total = 0;
    if (followers.instagram) total += followers.instagram;
    if (followers.tiktok) total += followers.tiktok;
    if (followers.youtube) total += followers.youtube;

    return total;
  }
}
