import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent implements OnInit {
  form!: FormGroup;
  userType!: 'influencer' | 'marca';
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private updateProfile: UpdateProfileUseCase,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.auth.currentUser!;
    this.userType = user.user_type as any;
    this.userId = user.id;

    // form base
    this.form = this.fb.group({
      display_name: [user.name, Validators.required],
      avatar_url: [user.avatar_url || ''],
      bio: ['', Validators.required],
      // influencer
      niche: [''],
      followers_count: [0],
      rate_per_post: [0],
      // marca
      sector: [''],
      budget_range: [''],
      objectives: [''],
    });

    // Si es influencer, hacemos obligatorios esos campos
    if (this.userType === 'influencer') {
      this.form.get('niche')?.setValidators([Validators.required]);
      this.form.get('followers_count')?.setValidators([Validators.required]);
      this.form.get('rate_per_post')?.setValidators([Validators.required]);
    } else {
      // marca
      this.form.get('sector')?.setValidators([Validators.required]);
      this.form.get('budget_range')?.setValidators([Validators.required]);
      this.form.get('objectives')?.setValidators([Validators.required]);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const base = this.form.value;
    const payload: ProfileVO = {
      user_id: this.userId,
      profile_completed: true,
      display_name: base.display_name,
      avatar_url: base.avatar_url,
      bio: base.bio,
      // mapeo condicional
      niche: base.niche,
      followers_count: base.followers_count,
      rate_per_post: base.rate_per_post,
      sector: base.sector,
      budget_range: base.budget_range,
      objectives: base.objectives,
    };

    this.updateProfile.execute(payload).subscribe((u) => {
      this.auth.save(u);
      this.router.navigateByUrl('/dashboard');
    });
  }
}
