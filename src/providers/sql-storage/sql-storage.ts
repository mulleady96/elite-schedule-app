import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorage { 

  private db: SQLiteObject;

  constructor(public sqLite: SQLite) {
    console.log('Hello SqlStorageProvider Provider');
  }

  initialiseDatabase(){ // Needs to be called after app is ready => check app.component.ts.
  return this.sqLite.create({
  name: 'data.db',
  location: 'default'
  })
  .then(db => {
    this.db = db;

    return this.db.executeSql('Create able if not exists kv (key text primarty key, value text)', [])
    .then(data => {
      console.log('After create table check', data);
    });
  });
}

  getAll(){
    return this.db.executeSql('SELECT key, value from kv', []).then(data => {
      let results = [];
      for(let i = 0; i < data.rows.length; i++) {
        results.push(JSON.parse(data.rows.item(i).value));
      }
      return results;
    });
  }

  get(key: string){ // retrieve a row
    return this.db.executeSql('select key, calue from kv where key = ? limit 1', [key]).then(data => {
      if(data.rows.length > 0) {
        return JSON.parse(data.rows.item(0).value)
      }
    });
  }

  remove(key: string) { // Delete a row
    return this.db.executeSql('delete from kv where key = ?', [key]);
  }

  set(key: string, value: string){ // Update a row
    return this.db.executeSql('insert or replace into kv(key,value) values (?, ?)', [key, value]).then(
      data => {
        if(data.rows.length > 0) {
          return JSON.parse(data.rows.item(0).value);
        }
      });
  }
}
