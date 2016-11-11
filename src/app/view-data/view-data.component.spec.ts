/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { ViewDataComponent } from './view-data.component';
import { DataService } from '../service/data.service';
import { Data } from '../shared/data';

var dataServiceStub = {
  getData(): Promise<Data[]> {
    return Promise.resolve([
        {no:1,date:"10/10/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:10,km:30,workTime:0.5,fuel:23.5,salary:200,cost:670,money:700},
        {no:2,date:"10/10/2016",car:"АХ 3036 АМ",driver:"Стасенко А.Е.",weight:5,km:27,workTime:0.7,fuel:25.4,salary:100,cost:608,money:700}
      ]);
  }
};

var FIELDS_ARRAY = {
  "no": "No",
  "date": "Date",
  "car": "Car",
  "driver": "Driver",
  "weight": "Weight",
  "km": "Km",
  "workTime": "WorkTime",
  "fuel": "Fuel",
  "salary": "Salary",
  "cost": "Cost",
  "money": "Money"
};

describe('ViewDataComponent', () => {

  let fixture: ComponentFixture<ViewDataComponent>;
  let componentDataService: DataService; // the actually injected service
  let dataService: DataService; // the TestBed injected service

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewDataComponent
      ],
      imports: [
        FormsModule,
        HttpModule
      ],
      providers: [{
        provide: DataService, useValue: dataServiceStub
      }]
    });
    fixture = TestBed.createComponent(ViewDataComponent);

    // DataService actually injected into the component
    dataService = fixture.debugElement.injector.get(DataService);
    componentDataService = dataService;
  });

  it('should create the ViewDataComponent', () => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should have eleven select components', () => {
    for(let c in FIELDS_ARRAY) {
      expect(fixture.debugElement.query(By.css('[name=flt'+FIELDS_ARRAY[c]+']'))).toBeTruthy();
    }
  });

  it('should have a table', () => {
    expect(fixture.debugElement.query(By.css('table'))).toBeTruthy();
  });

  it('should inject the component\'s DataService instance', inject([DataService], (service: DataService) => {
    expect(service).toBe(componentDataService);
  }));

  it('should set data array with 2 rows', fakeAsync(() => {
    let comp = fixture.debugElement.componentInstance;
    expect(comp.dataset).toBeUndefined();
    fixture.detectChanges();
    tick();
    expect(comp.dataset.length).toBe(2);
  }));

  it('should initialize filters with two values for each except date and money filters with only one value', fakeAsync(() => {
    let comp = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    tick();
    for(let c in FIELDS_ARRAY) {
      if(c == "no") {
        expect(comp[c + "ms"].length).toBe(2);
      } else if(c == "salary") {
        expect(comp["salaries"].length).toBe(2);
      } else if (c == "date" || c == "money") {
        expect(comp[c + "s"].length).toBe(1);
      } else {
        expect(comp[c + "s"].length).toBe(2);
      }
    }
  }));

  it('should sort data array by all filters asc and desc', fakeAsync(() => {
    let comp = fixture.debugElement.componentInstance;
    expect(comp.dataset).toBeUndefined();
    fixture.detectChanges();
    tick();
    for(let c in FIELDS_ARRAY) {
      //sort asc
      comp.sort(c);
      expect(comp.dataset[0][c]).not.toBeGreaterThan(comp.dataset[1][c]);
      //sort desc
      comp.sort(c);
      expect(comp.dataset[0][c]).not.toBeLessThan(comp.dataset[1][c]);
    }
  }));

  it('should filter data array after filter value was selected and deselected', fakeAsync(() => {
    let comp = fixture.debugElement.componentInstance;
    expect(comp.dataset).toBeUndefined();
    for(let c in FIELDS_ARRAY) {
      fixture.detectChanges();
      tick();
      //set filter
      if(c == "no") {
        comp.filter[c] = comp.noms[0];
      } else if(c == "salary") {
        comp.filter[c] = comp.salaries[0];
      } else {
        comp.filter[c] = comp[c + "s"][0];
      }
      comp.onFilter(c);
      //check
      for(let x = 0; x < comp.dataset.length; x++) {
        expect(comp.dataset[x][c]).toEqual(comp.filter[c]);
      }
      //clear filter
      if(c == "date" || c == "car" || c == "driver") {
        comp.filter[c] = "";
      } else {
        comp.filter[c] = -1;
      }
      comp.clearFilter(c);
      //check after tick
      fixture.detectChanges();
      tick();
      expect(comp.dataset.length).toBe(2);
    };
    fixture.detectChanges();
    tick();
  }));

});
