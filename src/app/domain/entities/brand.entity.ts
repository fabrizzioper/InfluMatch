import { User } from './user.entity';

export class Brand extends User {
  sector?: string;
  website?: string;
  budget_range?: string;
  objectives?: string;
  contact_name?: string;
  contact_position?: string;
  content_s?: string;
  influencer_s?: string;
  campaign_duration?: string;
  additional_info?: string;

  constructor(data: Partial<Brand>) {
    super(data);
    this.user_type = 'marca';
    Object.assign(this, data);
  }
}
