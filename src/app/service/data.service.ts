import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Data } from '../shared/data';

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private dataUrl = 'app/data';

  constructor(private http: Http) { }

  getData(): Promise<Data[]> {
    return this.http.get(this.dataUrl)
      .toPromise()
      .then(response => response.json().data as Data[])
      .catch(this.handleError);
  }

  getRec(no: number): Promise<Data> {
    return this.getData()
      .then(dataAr => dataAr.find(data => data.no === no));
  }

  deleteRec(no: number): Promise<void> {
    const url = `${this.dataUrl}/${no}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  createRec(rec: Data): Promise<Data> {
    let no: number;
    if(rec == null) {
      rec = new Data();
      rec.no = 0;
      rec.date = (new Date()).toLocaleDateString();
      rec.car = "АХ 1367 ВI";
      rec.driver = "Плотников С.Л.";
      rec.weight = 0;
      rec.km = 0;
      rec.workTime = 0;
      rec.fuel = 0;
      rec.salary = 0;
      rec.cost = 0;
      rec.money = 0;
      no = 1;
    }
    else {
      no = rec.no + 1;
    }
    return this.http
      .post(this.dataUrl, JSON.stringify({
        no: no,
        date: rec.date,
        car: rec.car,
        driver: rec.driver,
        weight: rec.weight,
        km: rec.km,
        workTime: rec.workTime,
        fuel: rec.fuel,
        salary: rec.salary,
        cost: rec.cost,
        money: rec.money
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  /*updateRec(data: Data): Promise<Data> {
   const url = `${this.dataUrl}/${data.no}`;
   return this.http
   .put(url, JSON.stringify(data), {headers: this.headers})
   .toPromise()
   .then(() => data)
   .catch(this.handleError);
   }*/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
