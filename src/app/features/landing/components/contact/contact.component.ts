import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface SubjectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  formStatus: 'idle' | 'success' | 'error' = 'idle';
  subjectOptions: SubjectOption[] = [];

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {
    this.initForm();
    this.initSubjectOptions();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['general', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  private initSubjectOptions(): void {
    this.subjectOptions = [
      { value: 'general', label: 'CONTACT.SUBJECT_GENERAL' },
      { value: 'support', label: 'CONTACT.SUBJECT_SUPPORT' },
      { value: 'sales', label: 'CONTACT.SUBJECT_SALES' },
      { value: 'partnership', label: 'CONTACT.SUBJECT_PARTNERSHIP' },
    ];
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.formStatus = 'idle';

      // Simulación de envío a API
      setTimeout(() => {
        // Simulamos un 90% de éxito
        const success = Math.random() > 0.1;

        if (success) {
          this.formStatus = 'success';
          this.contactForm.reset();
          // Restauramos el valor por defecto del subject
          this.contactForm.patchValue({ subject: 'general' });
        } else {
          this.formStatus = 'error';
        }

        this.isSubmitting = false;
      }, 1500);
    }
  }
}
