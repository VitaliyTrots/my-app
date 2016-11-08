import { Component, OnInit } from '@angular/core';

import { Data } from './data';
import { DataService } from './data.service';

@Component({
    selector: 'view-data',
    templateUrl: './view-data.component.html',
    styleUrls: ['./view-data.component.css']
})

export class ViewDataComponent implements OnInit {
  dataset: Data[];
  noms: number[] = [];
  dates: string[] = [];
  cars: string[] = [];
  drivers: string[] = [];
  weights: number[] = [];
  kms: number[] = [];
  workTimes: number[] = [];
  fuels: number[] = [];
  salaries: number[] = [];
  costs: number[] = [];
  moneys: number[] = [];
  curSortField: string = "";

  filter: Data = {
    no: -1,
    date: "",
    car: "",
    driver: "",
    weight: -1,
    km: -1,
    workTime: -1,
    fuel: -1,
    salary: -1,
    cost: -1,
    money: -1,
  };

  constructor(private dataService: DataService) {
  }

  getData(): void {
    this.dataService
      .getData()
      .then(data => {
        this.dataset = data;
      });
  }

  filterInitialization() {
    setTimeout(() => {
      //filter's cleaning
      this.noms = [];
      this.dates = [];
      this.cars = [];
      this.drivers = [];
      this.weights = [];
      this.kms = [];
      this.workTimes = [];
      this.fuels = [];
      this.salaries = [];
      this.costs = [];
      this.moneys = [];

      //filter's filling
      for(let c = 0; c < this.dataset.length; c++) {
        console.log(this.dataset[c].driver);
        if(this.noms.indexOf(this.dataset[c].no) === -1) {
          this.noms.push(this.dataset[c].no);
        }
        if(this.dates.indexOf(this.dataset[c].date) === -1) {
          this.dates.push(this.dataset[c].date);
        }
        if(this.cars.indexOf(this.dataset[c].car) === -1) {
          this.cars.push(this.dataset[c].car);
        }
        if(this.drivers.indexOf(this.dataset[c].driver) === -1) {
          this.drivers.push(this.dataset[c].driver);
        }
        if(this.weights.indexOf(this.dataset[c].weight) === -1) {
          this.weights.push(this.dataset[c].weight);
        }
        if(this.kms.indexOf(this.dataset[c].km) === -1) {
          this.kms.push(this.dataset[c].km);
        }
        if(this.workTimes.indexOf(this.dataset[c].workTime) === -1) {
          this.workTimes.push(this.dataset[c].workTime);
        }
        if(this.fuels.indexOf(this.dataset[c].fuel) === -1) {
          this.fuels.push(this.dataset[c].fuel);
        }
        if(this.salaries.indexOf(this.dataset[c].salary) === -1) {
          this.salaries.push(this.dataset[c].salary);
        }
        if(this.costs.indexOf(this.dataset[c].cost) === -1) {
          this.costs.push(this.dataset[c].cost);
        }
        if(this.moneys.indexOf(this.dataset[c].money) === -1) {
          this.moneys.push(this.dataset[c].money);
        }
      }

      //filter's sorting
      this.noms.sort((a, b) => a - b);
      this.dates.sort();
      this.cars.sort();
      this.drivers.sort();
      this.weights.sort((a, b) => a - b);
      this.kms.sort((a, b) => a - b);
      this.workTimes.sort((a, b) => a - b);
      this.fuels.sort((a, b) => a - b);
      this.salaries.sort((a, b) => a - b);
      this.costs.sort((a, b) => a - b);
      this.moneys.sort((a, b) => a - b);
    }, 0);
  }

  ngOnInit(): void {
    this.getData();

    //initialization filters
    this.filterInitialization()
  }

  sort(by: string): void {
    if(this.curSortField === by) {
      this.dataset.sort((a: Data, b: Data) => {
        if(a[by].localeCompare) {
          return b[by].localeCompare(a[by]) || (b.no - a.no);
        } else {
          return (b[by] - a[by]) || (b.no - a.no);
        }
      });
      this.curSortField = "";
    } else {
      this.dataset.sort((a: Data, b: Data) => {
        if(a[by].localeCompare) {
          return a[by].localeCompare(b[by]) || (a.no - b.no);
        } else {
          return (a[by] - b[by]) || (a.no - b.no);
        }
      });
      this.curSortField = by;
    }
  }

  show() {
    console.log(this.filter);
  }

  clearFilter(by: string) {
    this.getData();
    setTimeout(() => {
      if(by !== "no" && +this.filter.no !== -1) {
        this.onFilter("no");
      }
      if(by !== "date" && this.filter.date !== "") {
        this.onFilter("date");
      }
      if(by !== "car" && this.filter.car !== "") {
        this.onFilter("car");
      }
      if(by !== "driver" && this.filter.driver !== "") {
        this.onFilter("driver");
      }
      if(by !== "weight" && +this.filter.weight !== -1) {
        this.onFilter("weight");
      }
      if(by !== "km" && +this.filter.km !== -1) {
        this.onFilter("km");
      }
      if(by !== "workTime" && +this.filter.workTime !== -1) {
        this.onFilter("workTime");
      }
      if(by !== "fuel" && +this.filter.fuel !== -1) {
        this.onFilter("fuel");
      }
      if(by !== "salary" && +this.filter.salary !== -1) {
        this.onFilter("salary");
      }
      if(by !== "cost" && +this.filter.cost !== -1) {
        this.onFilter("cost");
      }
      if(by !== "money" && +this.filter.money !== -1) {
        this.onFilter("money");
      }
    }, 0);
  }

  onFilter(by: string) {
    if(this.filter[by] === "" || +this.filter[by] === -1) {
      //сброс фильтра
      this.clearFilter(by);
    } else {
      this.dataset = this.dataset.filter(val => val[by] === this.filter[by]);
    }
    this.filterInitialization();
  }
}
