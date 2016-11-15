// Straight Jasmine - no imports from Angular test libraries
import { HttpModule, XHRBackend, Http, Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { async, fakeAsync, TestBed, inject } from "@angular/core/testing";

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { DataService } from "./data.service";
import {Data} from "../shared/data";

const makeData = () => [
  {no:1,date:"10/10/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:10,km:30,workTime:0.5,fuel:23.5,salary:200,cost:670,money:700},
  {no:2,date:"10/10/2016",car:"АХ 3036 АМ",driver:"Стасенко А.Е.",weight:5,km:27,workTime:0.7,fuel:25.4,salary:100,cost:608,money:700}
] as Data[];

describe('Http-DataService (mockBackend)', () => {

  let service: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        DataService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([DataService], (service: DataService) => {
      expect(service instanceof DataService).toBe(true);
  }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull();
    let service = new DataService(http);
    expect(service instanceof DataService).toBe(true);
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull();
  }));

  describe('when getData', () => {
    let backend: MockBackend;
    let service: DataService;
    let fakeData: Data[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new DataService(http);
      fakeData = makeData();
      let options = new ResponseOptions({status: 200, body: {data: fakeData}});
      response = new Response(options);
    }));

    it('should have expected fake data (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getData()
        .then(data => {
          expect(data.length).toBe(fakeData.length);
        });
    })));

    it('should be OK returning no dataset', fakeAsync(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getData()
        .then(data => {
          expect(data.length).toBe(0);
        });
    })));

    it('should treat 404 as an Promise error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => {
        c.mockRespond(resp);
      });

      service.getData()
        .then(heroes => {
          fail('should not respond with heroes');
        })
        .catch(err => {
          expect(err).toMatch(/Cannot read property 'data' of null/);
        });
    })));

  });

});
