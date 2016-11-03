import { Component, OnInit } from '@angular/core';

import { Data } from './data';
import { DataService } from './data.service';

@Component({
    selector: 'input-data',
    templateUrl: './input-data.component.html',
    styleUrls: ['./input-data.component.css']
})

export class InputDataComponent implements OnInit {
    dataset: Data[];
    selectedRec: Data;
    editable: number = 0;

    constructor(private dataService: DataService) {
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
        setTimeout(() => this.onSelect(this.dataset[0]), 0);
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
