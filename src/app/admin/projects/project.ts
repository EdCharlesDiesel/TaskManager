export class Project {
  projectId:  any;
  projectName: string | null;
  dateOfStart: Date | null;
  teamSize: string | null;

  constructor() {
    this.projectId = '0'
    this.projectName = null,
      this.dateOfStart = null,
      this.teamSize = null
  }
}
