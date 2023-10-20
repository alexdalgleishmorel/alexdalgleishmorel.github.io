import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateAppointmentModalComponent } from '../create-appointment-modal/create-appointment-modal.component';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {

  public timeLabels: string[] = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00'
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async onTimeslotSelect(weekday: string, startTime: string) {
    const modal = await this.modalCtrl.create({
      component: CreateAppointmentModalComponent,
      componentProps: {
        date: weekday,
        startTime: startTime
      }
    });
    modal.present();
  }
}
