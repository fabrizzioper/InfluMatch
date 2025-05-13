import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../domain/entities/user.entity';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }
}
