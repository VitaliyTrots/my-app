import { Component, Input } from '@angular/core';

import { Data } from './data';

@Component({
    selector: 'edit-data',
    templateUrl: './edit-data.component.html',
    styleUrls: [ './edit-data.component.css' ]
})

export class EditDataComponent {

    @Input() data: Data;
    editable: number = 0;

    calc() {
        this.data.fuel = Math.round((this.data.km * 0.5 + this.data.workTime * 17) * 10) / 10;
        this.data.salary = Math.round(this.data.weight * 20);
        this.data.cost = Math.round(this.data.fuel * 20 + this.data.salary);
        this.data.money = Math.ceil(this.data.cost / 100) * 100;
    }
}
