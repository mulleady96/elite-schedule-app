import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { UserSettings } from '../providers/user-settings/user-settings';
import { EliteApi } from '../providers/elite-api/elite-api';
import { TeamHomePage } from '../pages/team-home/team-home';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
     public splashScreen: SplashScreen, public userSettings: UserSettings,
      public loadingController: LoadingController, public eliteApi: EliteApi) {
    this.initializeApp();

    // used for an example of ngFor and navigation


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavourites();
      this.userSettings.initStorage().then(() => this.rootPage = MyTeamsPage);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  refreshFavourites(){
    //this.favoriteTeams = this.userSettings.getAllFavourites();
  }

  goToTeam(favorite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tourneyId).subscribe(l => this.nav.push(TeamHomePage));
  }

  goHome(){
    this.nav.push(MyTeamsPage);
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }
}
