import { Component } from '@angular/core';

import { DataService, Message, SystemUser } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userContext: SystemUser

  constructor(private dataService: DataService) {
    this.userContext = this.dataService.getCurrentUser();
  }
}
