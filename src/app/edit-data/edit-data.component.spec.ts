/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { EditDataComponent } from './edit-data.component';
import { Data } from '../shared/data';

describe('EditDataComponent', () => {

  let fixture: ComponentFixture<EditDataComponent>;
  let comp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditDataComponent
      ],
      imports: [
        FormsModule,
        HttpModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataComponent);
    comp = fixture.componentInstance;
    comp.data = new Data();
    comp.data.no = 1;
    comp.data.date = "10/10/2016";
    comp.data.car = "АХ 1367 ВI";
    comp.data.driver = "Плотников С.Л.";
    comp.data.weight = 10;
    comp.data.km = 30;
    comp.data.workTime = 0.5;
    comp.data.fuel = 23.5;
    comp.data.salary = 200;
    comp.data.cost = 670;
    comp.data.money = 700;
    fixture.detectChanges();
  });

  it('should create the EditDataComponent', () => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should have ten input components', () => {
    expect(fixture.debugElement.queryAll(By.css('input')).length).toBe(10);
  });

  it('should input fields be disabled depending on "editable" attribute', fakeAsync(() => {
    //all disabled
    comp.editable = -1;
    fixture.detectChanges();
    tick();
    var inputs = fixture.debugElement.queryAll(By.css('input'));
    for(let c = 0; c < inputs.length; c++) {
      expect(inputs[c].nativeElement.disabled).toBe(true);
    }
    //0-5 enabled, 6-9 disabled
    comp.editable = 0;
    fixture.detectChanges();
    tick();
    var inputs = fixture.debugElement.queryAll(By.css('input'));
    for(let c = 0; c < inputs.length; c++) {
      if(c < 6) {
        expect(inputs[c].nativeElement.disabled).toBe(false);
      } else {
        expect(inputs[c].nativeElement.disabled).toBe(true);
      }
    }
    //all enabled
    comp.editable = 1;
    fixture.detectChanges();
    tick();
    var inputs = fixture.debugElement.queryAll(By.css('input'));
    for(let c = 0; c < inputs.length; c++) {
      expect(inputs[c].nativeElement.disabled).toBe(false);
    }
  }));

  it('should calculate the dependent values correctly', () => {
    let comp = fixture.debugElement.componentInstance;
    expect(comp.data.cost).toBe(670);
    //change weight
    comp.data.weight = 12;
    comp.calc();
    expect(comp.data.salary).toBe(240);
    expect(comp.data.cost).toBe(710);
    //change km
    comp.data.km = 20;
    comp.calc();
    expect(comp.data.fuel).toBe(18.5);
    expect(comp.data.cost).toBe(610);
    //change workTime
    comp.data.workTime = 0.9;
    comp.calc();
    expect(comp.data.fuel).toBe(25.3);
    expect(comp.data.cost).toBe(746);
    //change fuel
    comp.data.fuel = 22;
    comp.calc("fuel");
    expect(comp.data.cost).toBe(680);
    //change salary
    comp.data.salary = 140;
    comp.calc("salary");
    expect(comp.data.cost).toBe(580);
    //change cost
    comp.data.cost = 601;
    comp.calc("cost");
    expect(comp.data.money).toBe(700);
  });

});
