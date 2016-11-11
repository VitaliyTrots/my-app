import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { Data } from '../shared/data';
import { Auth } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'input-data',
  templateUrl: 'input-data.component.html',
  styleUrls: ['input-data.component.css']
})

export class InputDataComponent implements OnInit, OnDestroy {
  dataset: Data[];
  selectedRec: Data;
  editable: number;
  subscription: Subscription;

  constructor(private dataService: DataService, private auth: Auth) {
    this.subscription = auth.userRole$.subscribe(role => this.editable = role);
    auth.changeUser();
  }

  getData(): void {
    this.dataService
      .getData()
      .then(data => {
        this.dataset = data;
      });
  }

  ngOnInit(): void {
    this.getData();
    // wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => {
      this.onSelect(this.dataset[0]);
    }, 0);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }


  onSelect(rec: Data): void {
    this.selectedRec = rec;
  }

  newRec() {
    this.dataService.createRec(this.selectedRec?this.selectedRec:(this.dataset.length > 0?this.dataset[this.dataset.length - 1]:null))
      .then(data => {
        this.dataset.push(data);
        this.onSelect(data);
      });
  }

  deleteRec(rec: Data) {
    if(confirm("Вы уверены что хотите стереть строку?")) {
      this.dataService
        .deleteRec(rec.no)
        .then(() => {
          this.dataset = this.dataset.filter(h => h !== rec);
          if (this.selectedRec === rec) { this.selectedRec = null; }
        });
    }
  }

}
