import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from '@agm/core'; // Google maps library.
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { GamePage } from '../pages/game/game';
import { TeamsPage } from '../pages/teams/teams';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { StandingsPage } from '../pages/standings/standings';
import { TeamHomePage } from '../pages/team-home/team-home';
import { MapPage } from '../pages/map/map';
import { EliteApi } from '../providers/elite-api/elite-api';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserSettings } from '../providers/user-settings/user-settings';
import { SqlStorage } from '../providers/sql-storage/sql-storage';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamePage,
    MapPage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDfUEFw086c3QcX3RWXB3UcPEK00p2TQXU'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SqlStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApi,
    UserSettings
  ]
})
export class AppModule {}
