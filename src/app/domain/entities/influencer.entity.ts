// src/app/domain/entities/influencer.entity.ts
export class Influencer {
  constructor(
    public id: string,
    public name: string,
    public bio: string,
    public avatarUrl: string
  ) {}
}
