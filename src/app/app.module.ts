import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { Auth } from './auth.service';
import { AppComponent } from './app.component';
import { InputDataComponent } from './input-data.component';
import { EditDataComponent } from './edit-data.component';
import { ViewDataComponent } from './view-data.component';
import { DataService } from './data.service';

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
        component: InputDataComponent
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
