import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail/team-detail';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})

export class TeamsPage {

  public teams = [];
  public allTeams: any;
  public allTeamDivisions: any;
  public queryText: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EliteApi, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: "Getting data..."
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;

        this.allTeamDivisions =
          _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();

         this.teams = this.allTeamDivisions;
          console.log('lodash command', this.teams);
          loader.dismiss();
      });
    });
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => { // lodash for each across all divisions and teams.
        let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower)); // bind the two i.e. divsion and team name together

        if(teams.length) { // add results to the array
          filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams});
        }
    });
    this.teams = filteredTeams; // returns division and team name. if match found.
  }

}
