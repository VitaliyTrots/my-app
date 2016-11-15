/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';

import { InputDataComponent } from './input-data.component';
import { EditDataComponent } from '../edit-data/edit-data.component';
import { DataService } from '../service/data.service';
import { Data } from '../shared/data';
import { Auth } from "../service/auth.service";
import { Subject } from 'rxjs/Subject';

var dataServiceStub = {
  getData(): Promise<Data[]> {
    return Promise.resolve([
      {no:1,date:"10/10/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:10,km:30,workTime:0.5,fuel:23.5,salary:200,cost:670,money:700},
      {no:2,date:"10/10/2016",car:"АХ 3036 АМ",driver:"Стасенко А.Е.",weight:5,km:27,workTime:0.7,fuel:25.4,salary:100,cost:608,money:700}
    ]);
  }
};

var authStub = {
  userProfile: Object,
  userRole: new Subject<number>(),
  userRole$: (new Subject<number>()).asObservable(),
  changeUser(): void {
    this.userRole.next(Math.round(Math.random() * 2 - 1));
  }

};

describe('InputDataComponent', () => {

  let fixture: ComponentFixture<InputDataComponent>;
  let comp;
  let componentDataService: DataService; // the actually injected service
  let dataService: DataService; // the TestBed injected service


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputDataComponent,
        EditDataComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],
      providers: [
        {
          provide: DataService, useValue: dataServiceStub
        },
        {
          provide: Auth, useValue: authStub
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDataComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    // DataService actually injected into the component
    dataService = fixture.debugElement.injector.get(DataService);
    componentDataService = dataService;
  });

  it('should have a table', fakeAsync(() => {
    expect(fixture.debugElement.query(By.css('table'))).toBeTruthy();
  }));

  it('should buttons be disabled depending on "editable" attribute', fakeAsync(() => {
    comp.ngOnInit();
    comp.editable = -1;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBe(true);
    expect(fixture.debugElement.query(By.css('tbody')).nativeElement  //table body
      .childNodes[2]  //first row
      .childNodes[23] //last column
      .childNodes[0]  //button in last column
      .attributes[2]  //disabled='' if defined
      .name).toBe("disabled");
    comp.editable = 0;
    fixture.detectChanges();
    tick();
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBe(false);
    expect(fixture.debugElement.query(By.css('tbody')).nativeElement  //table body
      .childNodes[2]  //first row
      .childNodes[23] //last column
      .childNodes[0]  //button in last column
      .attributes[2]).toBeUndefined();
    comp.editable = 1;
    fixture.detectChanges();
    tick();
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBe(false);
    expect(fixture.debugElement.query(By.css('tbody')).nativeElement  //table body
      .childNodes[2]  //first row
      .childNodes[23] //last column
      .childNodes[0]  //button in last column
      .attributes[2]).toBeUndefined();
  }));

  it('should set data array with 2 rows', fakeAsync(() => {
    let comp = fixture.debugElement.componentInstance;
    expect(comp.dataset).toBeUndefined();
    comp.editable = 1;
    comp.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(comp.dataset.length).toBe(2);
  }));

});
