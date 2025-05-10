// src/app/domain/entities/company.entity.ts
export class Company {
  constructor(
    public id: string,
    public name: string,
    public industry: string,
    public logoUrl: string
  ) {}
}
