import { Component } from '@angular/core';

import { Auth } from '../service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Бухгалтерский учет';

  constructor(private auth: Auth) {}

}
