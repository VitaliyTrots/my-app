/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";

import { Subject } from 'rxjs/Subject';

import { AppComponent } from './app.component';
import { ViewDataComponent } from "../view-data/view-data.component";
import { InputDataComponent } from "../input-data/input-data.component";
import { EditDataComponent } from "../edit-data/edit-data.component";
import { Auth } from "../service/auth.service";
import { RouterLinkStubDirective } from "../testing/router-stubs";
import { RouterOutletStubComponent } from '../testing/router-stubs';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

var authStub = {
  userProfile: Object,
  userRole: new Subject<number>(),
  userRole$: (new Subject<number>()).asObservable(),
  changeUser(): void {
    this.userRole.next(Math.round(Math.random() * 2 - 1));
  },
  authenticated(): boolean { return true;}
};

describe('AppComponent & TestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        InputDataComponent,
        EditDataComponent,
        ViewDataComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        {
          provide: Auth, useValue: authStub
        }
      ]
    })
      .compileComponents()
      .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
    });
  }));
  tests();
});

//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: Auth, useValue: authStub
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;
      });
  }));
  tests();
});

//////// Testing w/ real root module //////
// Tricky because we are disabling the router and its configuration
// Better to use RouterTestingModule
import { AppModule }    from '../app.module';
import {RouterModule} from "@angular/router";

describe('AppComponent & AppModule', () => {

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [
        {
          provide: Auth, useValue: authStub
        }
      ]
    })

    // Get rid of app's Router configuration otherwise many failures.
    // Doing so removes Router declarations; add the Router stubs
      .overrideModule(AppModule, {
        remove: {
          imports: [
            RouterModule.forRoot([
              {
                path: 'input',
                component: InputDataComponent
              },
              {
                path: 'view',
                component: ViewDataComponent
              },
              {
                path: '',
                redirectTo: '/input',
                pathMatch: 'full'
              }
            ])
          ]
        },
        add: {
          declarations: [ RouterLinkStubDirective, RouterOutletStubComponent ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;
      });
  }));

  tests();
});

function tests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    // trigger initial data binding
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe('/input');
    expect(links[1].linkParams).toBe('/view');
  });

  it('can click Heroes link in template', () => {
    const heroesLinkDe = linkDes[1];
    const heroesLink = links[1];

    expect(heroesLink.navigatedTo).toBeNull('link should not have navigated yet');

    heroesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(heroesLink.navigatedTo).toBe('/view');
  });

}
