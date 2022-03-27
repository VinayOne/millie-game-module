import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentAreaComponent } from './components/content-area/content-area.component';
import { LoginComponent } from './components/login/login.component';
import { CreatorDashboardHomeComponent } from './components/creator-dashboard-home/creator-dashboard-home.component';
import { CreatorDashboardComponent } from './components/creator-dashboard/creator-dashboard.component';
import { GameOverComponent } from './components/game-over/game-over.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ContentAreaComponent
  },
  {
    path: 'dashboard-home',
    component: CreatorDashboardHomeComponent
  },
  {
    path: 'dashboard',
    component: CreatorDashboardComponent,
  },
  {
    path: 'dashboard/:id',
    component: CreatorDashboardComponent,
  },
  {
    path: 'game-over',
    component: GameOverComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
