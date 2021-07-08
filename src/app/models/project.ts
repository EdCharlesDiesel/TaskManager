import { ClientLocation } from './client-location';

export class Project
{
    projectID: number;
    projectName: string;
    dateOfStart: string;
    teamSize: number;
    active: boolean;
    status: string;
    clientLocationID: number;
    clientLocation: ClientLocation;

    constructor()
    {
        this.projectID = 0;
        this.projectName = '';
        this.dateOfStart = '';
        this.teamSize = 0;
        this.active = true;
        this.status = '';
        this.clientLocationID = 0;
        this.clientLocation = new ClientLocation();
    }
}
