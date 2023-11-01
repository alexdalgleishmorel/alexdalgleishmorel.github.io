import { Component } from '@angular/core';

import { DataService, DateRange, SystemUser } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import { DateSelectionModalComponent } from '../components/date-selection-modal/date-selection-modal.component';
import { PatientSearchModalComponent } from '../patient-search-modal/patient-search-modal.component';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userContext: SystemUser
  public physicianName: string = '';
  public physicianNameList: string[];
  public dateRangeIndex: number = 52;

  constructor(private dataService: DataService, private modalCtrl: ModalController) {
    this.userContext = this.dataService.getCurrentUser();
    this.physicianNameList = this.dataService.getPhysicianNameList();
    this.dataService.dateRangeIndex.subscribe(index => {
      this.dateRangeIndex = index;
    });
  }

  async openCalendar() {
    const modal = await this.modalCtrl.create({
      component: DateSelectionModalComponent,
    });
    modal.present();
  }

  public getCurrentDateRange(): string {
    const dateRange: DateRange = this.dataService.dateRanges[this.dateRangeIndex];
    return `${dateRange.startDate} - ${dateRange.endDate}`;
  }

  public decrementDateIndex() {
    this.dateRangeIndex -= this.dateRangeIndex > 0 ? 1 : 0;
  }

  public incrementDateIndex() {
    this.dateRangeIndex += this.dateRangeIndex < this.dataService.dateRanges.length - 1 ? 1 : 0;
  }

  async openPatientSearchModal() {
    const modal = await this.modalCtrl.create({
      component: PatientSearchModalComponent,
    });
    modal.present();
  }

  async openLogoutModal() {
    const modal = await this.modalCtrl.create({
      component: LogoutModalComponent,
      componentProps: {
        profile: this.dataService.getSystemUser()
      },
      cssClass: 'custom-modal'
    });
    modal.present();
  }
}
