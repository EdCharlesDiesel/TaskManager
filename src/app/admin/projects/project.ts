export class Project {
  projectId: string;
  projectName: string;
  dateOfStart: Date;
  teamSize: string;

  constructor() {
    this.projectId = '00000000-0000-0000-0000-000000000000',
      this.projectName = '',
      this.dateOfStart = new Date,
      this.teamSize = '0'
  }
}
