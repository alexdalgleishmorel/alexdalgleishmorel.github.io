import { Component } from '@angular/core';

import { DataService, DateRange, SystemUser } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import { DateSelectionModalComponent } from '../components/date-selection-modal/date-selection-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userContext: SystemUser
  public physicianName: string;
  public dateIndex: number = 0;

  constructor(private dataService: DataService, private modalCtrl: ModalController) {
    this.userContext = this.dataService.getCurrentUser();
    this.physicianName = this.dataService.getPhysicianName();
  }

  async openCalendar() {
    const modal = await this.modalCtrl.create({
      component: DateSelectionModalComponent,
    });
    modal.present();
  }

  public getCurrentDateRange(): string {
    const dateRange: DateRange = this.dataService.dateRanges[this.dateIndex];
    return `${dateRange.startDate} - ${dateRange.endDate}`;
  }

  public decrementDateIndex() {
    this.dateIndex -= this.dateIndex > 0 ? 1 : 0;
  }

  public incrementDateIndex() {
    this.dateIndex += this.dateIndex < this.dataService.dateRanges.length - 1 ? 1 : 0;
  }
}
