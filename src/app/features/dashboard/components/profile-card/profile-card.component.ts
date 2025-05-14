import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <img [src]="imgUrl" class="avatar" alt="Avatar" />
      <h4>{{ title }}</h4>
      <p class="subtitle">{{ subtitle }}</p>
      <small class="details">{{ details }}</small>
    </div>
  `,
})
export class ProfileCardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() imgUrl!: string;
  @Input() details!: string;
}
