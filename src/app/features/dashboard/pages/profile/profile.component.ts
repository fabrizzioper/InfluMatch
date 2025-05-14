import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  getSocialLinks(): { name: string; url: string; icon: string }[] {
    if (!this.user?.social_links) return [];

    const links = [];
    const socialIcons: { [key: string]: string } = {
      instagram: 'fab fa-instagram',
      facebook: 'fab fa-facebook',
      twitter: 'fab fa-twitter',
      linkedin: 'fab fa-linkedin',
      tiktok: 'fab fa-tiktok',
      youtube: 'fab fa-youtube',
    };

    for (const [platform, url] of Object.entries(this.user.social_links)) {
      if (url) {
        links.push({
          name: platform.charAt(0).toUpperCase() + platform.slice(1),
          url: url as string,
          icon: socialIcons[platform] || 'fas fa-link',
        });
      }
    }

    return links;
  }
}
