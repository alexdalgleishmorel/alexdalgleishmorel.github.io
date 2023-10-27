import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Appointment, DataService } from 'src/app/services/data.service';
import { CancelAppointmentModalComponent } from '../cancel-appointment-modal/cancel-appointment-modal.component';

@Component({
  selector: 'app-view-appointment-modal',
  templateUrl: './view-appointment-modal.component.html',
  styleUrls: ['./view-appointment-modal.component.scss'],
})
export class ViewAppointmentModalComponent implements OnInit {

  @Input() appointment?: Appointment;
  public disabled: boolean = true;

  constructor(private dataService: DataService, private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {    
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
  }

  getAppointmentDate(): string {
    if (!this.appointment) return '';

    let date: Date = new Date(this.appointment.date);

    return date.toLocaleDateString('en-US');
  }

  getAppointmentTimeRange(): string {
    if (!this.appointment) return '';

    let date: Date = new Date(this.appointment.date);
    date.setHours(this.appointment.startTime);

    const startTimeString = this.dataService.getHourRepresentation(date.getHours());

    date.setHours(this.appointment.endTime);

    const endTimeString = this.dataService.getHourRepresentation(date.getHours());

    return `${startTimeString} - ${endTimeString}`;
  }

  async openCancelAppointmentModal() {
    const modal = await this.modalCtrl.create({
      component: CancelAppointmentModalComponent
    });
    modal.present();

    // Wait for the confirmation modal to return a response
    const confirmed = (await modal.onWillDismiss()).data;

    // Wait for the confirmation modal to completely close
    await modal.onDidDismiss();

    if (confirmed) {
      // cancel the appointment here
      // ...

      // then close the modal right away
      this.modalCtrl.dismiss();
    }
  }
}
