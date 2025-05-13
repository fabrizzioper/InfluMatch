import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../domain/entities/user.entity';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    TranslateModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }
}
