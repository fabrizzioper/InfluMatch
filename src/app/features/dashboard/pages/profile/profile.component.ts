import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { GetUserByIdUseCase } from '../../../../application/use-cases/get-user-by-id.usecase';
import { User } from '../../../../domain/entities/user.entity';
import { Brand } from '../../../../domain/entities/brand.entity';
import { Influencer } from '../../../../domain/entities/influencer.entity';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = true;
  error = false;

  constructor(
    private authService: AuthService,
    private getUserByIdUseCase: GetUserByIdUseCase
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser;
    if (currentUser && currentUser.id) {
      this.loadUserProfile(currentUser.id);
    } else {
      this.loading = false;
    }
  }

  loadUserProfile(userId: string): void {
    this.getUserByIdUseCase.execute(userId).subscribe(
      (user) => {
        this.user = user;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading user profile:', error);
        this.error = true;
        this.loading = false;
      }
    );
  }

  getDefaultAvatar(): string {
    return 'assets/images/default-avatar.png';
  }

  isInfluencer(user: User): user is Influencer {
    return user.user_type === 'influencer';
  }

  isBrand(user: User): user is Brand {
    return user.user_type === 'marca';
  }

  formatFollowers(count: number): string {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }
}
