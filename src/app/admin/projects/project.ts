export class Project {
  productId: string;
  productName: string;
  dateOfStart: Date;
  teamSize: string;

  constructor() {
    this.productId = '00000000-0000-0000-0000-000000000000',
      this.productName = '',
      this.dateOfStart = new Date,
      this.teamSize = '0'
  }
}
