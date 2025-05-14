export class SocialMedia {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;

  constructor(data: Partial<SocialMedia>) {
    Object.assign(this, data);
  }

  hasAnyLink(): boolean {
    return Object.values(this).some((link) => !!link);
  }

  getInstagramUrl(): string {
    return this.instagram ? `https://instagram.com/${this.instagram}` : '';
  }

  getFacebookUrl(): string {
    return this.facebook ? `https://facebook.com/${this.facebook}` : '';
  }

  getTiktokUrl(): string {
    return this.tiktok ? `https://tiktok.com/@${this.tiktok}` : '';
  }

  getYoutubeUrl(): string {
    return this.youtube ? `https://youtube.com/${this.youtube}` : '';
  }

  getTwitterUrl(): string {
    return this.twitter ? `https://twitter.com/${this.twitter}` : '';
  }
}
