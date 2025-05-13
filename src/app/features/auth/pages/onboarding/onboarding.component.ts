import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../../core/services/auth.service';
import { UpdateProfileUseCase } from '../../../../application/use-cases/update-profile.usecase';
import { ProfileVO } from '../../../../domain/value-objects/profile.vo';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  form!: FormGroup;
  user_type!: 'influencer' | 'marca';
  userId!: string;
  console = console; // Para poder usar console.log en el template

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private updateProfile: UpdateProfileUseCase,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.auth.currentUser!;
    this.user_type = user.user_type as any;
    this.userId = user.id;

    // Crear formulario base con campos comunes
    this.form = this.fb.group({
      display_name: [user.name, Validators.required],
      avatar_url: [user.avatar_url || ''],
      bio: ['', Validators.required],
      location: ['', Validators.required],
      contact_email: [user.email, [Validators.required, Validators.email]],
    });

    // Añadir campos específicos según el tipo de usuario
    if (this.user_type === 'influencer') {
      this.form.addControl('niche', this.fb.control('', Validators.required));
      this.form.addControl(
        'followers',
        this.fb.group({
          instagram: [0],
          tiktok: [0],
          youtube: [0],
        })
      );
      this.form.addControl(
        'rate_per_post',
        this.fb.control(0, Validators.required)
      );
      this.form.addControl('engagement_rate', this.fb.control(''));
      this.form.addControl('main_audience', this.fb.control(''));
      this.form.addControl('languages', this.fb.control([]));
      this.form.addControl(
        'social_links',
        this.fb.group({
          instagram: [''],
          tiktok: [''],
          youtube: [''],
        })
      );
      this.form.addControl('portfolio_urls', this.fb.array([]));

      // Añadir una URL de portafolio por defecto
      this.addPortfolioUrl();
    } else {
      // Campos para marcas
      this.form.addControl('sector', this.fb.control('', Validators.required));
      this.form.addControl('website', this.fb.control(''));
      this.form.addControl(
        'budget_range',
        this.fb.control('', Validators.required)
      );
      this.form.addControl(
        'objectives',
        this.fb.control('', Validators.required)
      );
      this.form.addControl('contact_name', this.fb.control(''));
      this.form.addControl('contact_position', this.fb.control(''));
      this.form.addControl('content_ s', this.fb.control([]));
    }
  }

  // Getter para acceder fácilmente al FormArray de portfolio_urls
  get portfolioUrls() {
    return this.form.get('portfolio_urls') as FormArray;
  }

  // Método para añadir una nueva URL al portafolio
  addPortfolioUrl() {
    if (this.user_type === 'influencer') {
      this.portfolioUrls.push(this.fb.control(''));
    }
  }

  // Método para eliminar una URL del portafolio
  removePortfolioUrl(index: number) {
    this.portfolioUrls.removeAt(index);
  }

  submit() {
    if (this.form.invalid) return;

    console.log('Form data:', this.form.value);

    const formData = this.form.value;
    const payload: ProfileVO = {
      user_id: this.userId,
      profile_completed: true,
      display_name: formData.display_name,
      avatar_url: formData.avatar_url,
      bio: formData.bio,
      location: formData.location,
      contact_email: formData.contact_email,
    };

    // Añadir campos específicos según el tipo de usuario
    if (this.user_type === 'influencer') {
      Object.assign(payload, {
        niche: formData.niche,
        followers: formData.followers,
        rate_per_post: formData.rate_per_post,
        engagement_rate: formData.engagement_rate,
        main_audience: formData.main_audience,
        languages: formData.languages,
        social_links: formData.social_links,
        portfolio_urls: formData.portfolio_urls,
      });
    } else {
      Object.assign(payload, {
        sector: formData.sector,
        website: formData.website,
        budget_range: formData.budget_range,
        objectives: formData.objectives,
        contact_name: formData.contact_name,
        contact_position: formData.contact_position,
        content_types: formData.content_types,
      });
    }

    this.updateProfile.execute(payload).subscribe((u) => {
      this.auth.save(u);
      this.router.navigateByUrl('/dashboard');
    });
  }
}
