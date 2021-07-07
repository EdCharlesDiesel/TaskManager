export class Project
{
    projectID: number;
    projectName: string;
    dateOfStart: string;
    teamSize: number;

    constructor()
    {
        this.projectID = 0;
        this.projectName = '';
        this.dateOfStart = '';
        this.teamSize = 0;
    }
}
