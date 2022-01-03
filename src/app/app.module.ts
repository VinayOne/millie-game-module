import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { InfoBoardComponent } from './components/info-board/info-board.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { InfographicComponent } from './components/infographic/infographic.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemComponent } from './components/item/item.component';
import { MilliesThisQuestComponent } from './components/millies-this-quest/millies-this-quest.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { GameAreaComponent } from './components/game-area/game-area.component';
import { LoginComponent } from './components/login/login.component';
import { ContentAreaComponent } from './components/content-area/content-area.component';
import { UserBoardComponent } from './components/user-board/user-board.component';
import { CreatorDashboardComponent } from './components/creator-dashboard/creator-dashboard.component';
import { CreatorDashboardHomeComponent } from './components/creator-dashboard-home/creator-dashboard-home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LeaderboardComponent,
    InfoBoardComponent,
    UserProfileComponent,
    InfographicComponent,
    ItemsComponent,
    ItemComponent,
    MilliesThisQuestComponent,
    ProgressBarComponent,
    GameAreaComponent,
    LoginComponent,
    ContentAreaComponent,
    UserBoardComponent,
    CreatorDashboardComponent,
    CreatorDashboardHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
