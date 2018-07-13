import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class EliteApi {

  private baseUrl = 'https://elite-schedule-app-ce10b.firebaseio.com/'; // link to our firebase DB.
  private currentTourney: any = {};
  private tourneyData = {};

  constructor(public http: Http) {

  }

  // Using Promises.
  getTournaments(){
  return new Promise(resolve => {
    this.http.get(`${this.baseUrl}/tournaments.json`)
    .subscribe(res => resolve(res.json()));
  });
}

  // Using rxJS
  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {

    if(!forceRefresh && this.tourneyData[tourneyId]) {
      this.currentTourney = this.tourneyData[tourneyId];
      console.log("Do not need to make a HTTP call, just return the data.");
      return Observable.of(this.currentTourney);
    }
    // If new data then refresh with the latest data with new http call.
    console.log("About to make HTTP call");
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .map(response => {
        this.tourneyData[tourneyId] = response.json();
        this.currentTourney = this.tourneyData[tourneyId];
        return this.currentTourney;
      });
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }

  getCurrentTourney() {
    return this.currentTourney;
  }
}
