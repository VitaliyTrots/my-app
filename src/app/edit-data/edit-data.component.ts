import { Component, Input } from '@angular/core';

import { Data } from '../shared/data';

@Component({
  selector: 'edit-data',
  templateUrl: 'edit-data.component.html',
  styleUrls: [ 'edit-data.component.css' ]
})

export class EditDataComponent {

  @Input() editable: number;
  @Input() data: Data;

  calc(what?: string) {
    switch(what) {
      case undefined:
        this.data.fuel = Math.round((this.data.km * 0.5 + this.data.workTime * 17) * 10) / 10;
      case "fuel":
        this.data.salary = Math.round(this.data.weight * 20);
      case "salary":
        this.data.cost = Math.round(this.data.fuel * 20 + this.data.salary);
      case "cost":
        this.data.money = Math.ceil(this.data.cost / 100) * 100;
    }
  }
}
