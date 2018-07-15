import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SqlStorage } from '../sql-storage/sql-storage';

  const win: any = window;

@Injectable()
export class UserSettings {
  public sqlMode = false;

  constructor(public storage: Storage, public sql: SqlStorage) {
    if(win.sqLite){
      this.sqlMode = true;
    } else {
      console.warn('sqLite plugin not installed on device, using IOnic storage instead');
    }
  }

  favouriteTeam(team, tournamentId, tournamentName){
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName};

    if(this.sqlMode) {
      this.sql.set(team.id.toString(), JSON.stringify(item));
      console.log('SQL Storage');
    } else {
      this.storage.set(team.id.toString(), JSON.stringify(item));
      console.log('Ionic local storage');
    }
  }

  unfavouriteTeam(team){
    if(this.sqlMode){
      this.sql.remove(team.id.toString());
    } else {
      this.storage.remove(team.id.toString());
    }
  }

  isFavouriteTeam(teamId: string) : Promise<boolean> {

    if(this.sqlMode){
      return this.sql.get(teamId.toString()).then(value => value ? true : false);
    } else {
      return new Promise(resolve => resolve(this.storage.get(teamId.toString()).then(value => value ? true : false)));
    }
  }

  getAllFavourites() : Promise<any> {
    if(this.sqlMode){
      return this.sql.getAll();
    } else {
      return new Promise(resolve => {
        let results = [];
        this.storage.forEach(data => {
          console.log('inside foreach', data);
          results.push(JSON.parse(data));
        });
        return resolve(results);
      });
    }
  }

  initStorage(){
    if(this.sqlMode) {
      return this.sql.initialiseDatabase();
    } else {
      return new Promise(resolve => resolve());
    }
  }

}
