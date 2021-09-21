import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

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
    GameAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
