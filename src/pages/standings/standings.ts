import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

    public divisionFilter = 'division';
    public allStandings: any[];
    public standings: any[];
    public team: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EliteApi) {
  }

  ionViewDidLoad() {

    this.team = this.navParams.data; // Retrieve current selected team
    let tourneyData = this.eliteApi.getCurrentTourney(); // Retrieve selected tournament
    this.standings = tourneyData.standings; // standings for the whole tournament.

    this.allStandings = tourneyData.standings;

    this.filterDivision(); // invoked when screen first loads.
    // this.allStandings = // Return values for divisionName and the corresponding points for this team.
    //   _.chain(this.standings)
    //     .groupBy('division')
    //     .toPairs()
    //     .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //     .value();

      console.log('standings: ', this.standings);
      console.log('division standings', this.allStandings);

  }

  getHeader(record, recordIndex, records){ // place a header at the beginning of each division.
    if(recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      return record.division;
    }
    return null;
  }

  filterDivision() {
    if(this.divisionFilter === 'all') { // click on all segment returns all divsions
      this.standings = this.allStandings;
    } else { // returns standings for the  selected team in that divsion only.
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

}
