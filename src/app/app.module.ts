import './shared/rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './service/in-memory-data.service';

import { Auth } from './service/auth.service';
import { AppComponent } from './app-comp/app.component';
import { InputDataComponent } from './input-data/input-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { DataService } from './service/data.service';

@NgModule({
  declarations: [
    AppComponent,
    InputDataComponent,
    EditDataComponent,
    ViewDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
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
  ],
  providers: [
    Auth,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
