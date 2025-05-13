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

import { AuthService } from '../../../../core/services/auth.service';
import { UpdateProfileUseCase } from '../../../../application/use-cases/update-profile.usecase';
import { ProfileVO } from '../../../../domain/value-objects/profile.vo';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  form!: FormGroup;
  user_type!: 'influencer' | 'marca';
  userId!: string;
  currentStep = 1;
  imagePreview: string | null = null;
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
          twitter: [''],
          facebook: [''],
        })
      );
      this.form.addControl('portfolio_urls', this.fb.array([]));
      this.form.addControl('previous_experience', this.fb.control(''));
      this.form.addControl('preferred_categories', this.fb.control([]));

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
      this.form.addControl('content_s', this.fb.control([]));
      this.form.addControl('influencer_s', this.fb.control([]));
      this.form.addControl('campaign_duration', this.fb.control(''));
      this.form.addControl('additional_info', this.fb.control(''));
      this.form.addControl(
        'social_links',
        this.fb.group({
          instagram: [''],
          facebook: [''],
        })
      );
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

  // Método para manejar la selección de archivos
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      // Validar tipo y tamaño
      if (!file.type.includes('image/')) {
        alert('Por favor, selecciona una imagen válida');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        alert('La imagen no debe superar los 2MB');
        return;
      }

      // Crear vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        // En un caso real, aquí subirías la imagen al servidor
        // y guardarías la URL en el formulario
        this.form.patchValue({
          avatar_url: this.imagePreview,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para eliminar la imagen
  removeImage() {
    this.imagePreview = null;
    this.form.patchValue({
      avatar_url: '',
    });
  }

  // Navegación entre pasos
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
      window.scrollTo(0, 0);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo(0, 0);
    }
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
        previous_experience: formData.previous_experience,
        preferred_categories: formData.preferred_categories,
      });
    } else {
      Object.assign(payload, {
        sector: formData.sector,
        website: formData.website,
        budget_range: formData.budget_range,
        objectives: formData.objectives,
        contact_name: formData.contact_name,
        contact_position: formData.contact_position,
        content_s: formData.content_s,
        influencer_s: formData.influencer_s,
        campaign_duration: formData.campaign_duration,
        additional_info: formData.additional_info,
        social_links: formData.social_links,
      });
    }

    this.updateProfile.execute(payload).subscribe((u) => {
      this.auth.save(u);
      this.router.navigateByUrl('/dashboard');
    });
  }
}
