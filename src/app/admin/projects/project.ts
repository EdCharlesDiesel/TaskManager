export class Project {
  projectId: string | null;
  projectName: string | null;
  dateOfStart: Date | null;
  teamSize: string | null;

  constructor() {
    this.projectId = null
    this.projectName = null,
      this.dateOfStart = null,
      this.teamSize = null
  }
}
