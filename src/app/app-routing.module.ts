import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashBoardComponent } from './dash-board/dash-board.component';

const routes: Routes = [
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'about', component: AboutComponent },
  {path: '', redirectTo: 'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
