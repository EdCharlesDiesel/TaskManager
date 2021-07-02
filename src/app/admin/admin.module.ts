import { DashboardService } from './dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent
  ],
  providers: [
    DashboardService
  ]
})
export class AdminModule { }
