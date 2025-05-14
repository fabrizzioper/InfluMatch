import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { ListInfluencersUseCase } from '../../../../application/use-cases/list-influencers.usecase';
import { ListBrandsUseCase } from '../../../../application/use-cases/list-brands.usecase';
import { InfluencerProfileVO } from '../../../../domain/value-objects/influencer-profile.vo';
import { BrandProfileVO } from '../../../../domain/value-objects/brand-profile.vo';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProfileCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  influencers: InfluencerProfileVO[] = [];
  brands: BrandProfileVO[] = [];
  role?: string;

  constructor(
    private auth: AuthService,
    private listInf: ListInfluencersUseCase,
    private listBr: ListBrandsUseCase
  ) {}

  ngOnInit() {
    this.role = this.auth.currentUser?.user_type;
    if (this.role === 'marca') {
      this.listInf.execute().subscribe((list) => (this.influencers = list));
    } else {
      this.listBr.execute().subscribe((list) => (this.brands = list));
    }
  }
}
