import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { MyProfileComponent } from './admin/my-profile/my-profile.component';
import { AdminModule } from './admin/admin.module';
import { ProjectsComponent } from './admin/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
