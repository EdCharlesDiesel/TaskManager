import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { AboutComponent } from "./about/about.component";
import { ProjectsComponent } from "./projects/projects.component";
import { FormsModule } from "@angular/forms";
import { DashboardService } from '../services/dashboard.service';
import { ClientLocationStatusValidatorDirective } from '../shared/client-location-status-validator.directive';
import { ProjectIDUniqueValidatorDirective } from '../shared/project-idunique-validator.directive';
import { TeamSizeValidatorDirective } from '../shared/team-size-validator.directive';


@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    AboutComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
  ],
  imports: [ CommonModule, FormsModule ],
  exports: [ DashboardComponent, MyProfileComponent, AboutComponent, ProjectsComponent, TeamSizeValidatorDirective, ClientLocationStatusValidatorDirective, ProjectIDUniqueValidatorDirective ],
  providers: [ DashboardService ]
})
export class AdminModule
{
}
