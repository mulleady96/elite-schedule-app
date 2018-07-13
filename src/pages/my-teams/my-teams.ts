import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { UserSettings } from '../../providers/user-settings/user-settings';


@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, public eliteApi: EliteApi,
    public userSettings: UserSettings) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage); // Push the TournamentsPage onto the navigation stack.
  }

  favoriteTapped($event, favorite){
    let loader = this.loadingController.create({
      content: "Getting data...",
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
  }

  ionViewDidEnter(){
    this.favorites = this.userSettings.getAllFavourites();
  }

}
