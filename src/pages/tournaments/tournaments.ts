import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
//import { MyTeamsPage } from '../my-teams/my-teams';
import { EliteApi } from '../../providers/elite-api/elite-api';


@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  public tournaments: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    //Loading Controller
    let loader = this.loadingController.create({
    content: "Getting Tournaments...",
    spinner: "circles" // customisation
  });

  loader.present().then(() => {
    // API provider - returns list of tournaments from firebase.
    this.eliteApi.getTournaments().then(data => {
    this.tournaments = data;
    loader.dismiss();
    });
  });

  }

  itemTapped($event, tourney){
    this.navCtrl.push(TeamsPage, tourney);
  }
}
