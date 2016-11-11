/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router, RouterOutlet } from "@angular/router";

import { AppComponent } from './app.component';

class MockRouter { public navigate() {}; }

describe('App: MyApp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        RouterOutlet
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });

  // it('should create the app', async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
  //
  // it(`should have as title 'Бухгалтерский учет'`, async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Бухгалтерский учет');
  // }));
  //
  // it('should render title in a h1 tag', async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Бухгалтерский учет');
  // }));
  //
  // it('should have a button "Log In"', async(() => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('button').textContent).toContain('Log In');
  // }));

});
