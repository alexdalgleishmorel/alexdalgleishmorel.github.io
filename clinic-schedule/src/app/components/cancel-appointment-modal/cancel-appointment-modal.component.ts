import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Appointment, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cancel-appointment-modal',
  templateUrl: './cancel-appointment-modal.component.html',
  styleUrls: ['./cancel-appointment-modal.component.scss'],
})
export class CancelAppointmentModalComponent implements OnInit {
  @Input() appointment?: Appointment;

  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastController: ToastController) {}

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss(null);
  }

  async confirm() {
    const toast = await this.toastController.create({
      message: 'Appointment was successfully removed from the schedule',
      duration: 3000,
      position: 'top',
      color: 'success',
      cssClass: 'centeredToast'
    });

    await toast.present();
    this.modalCtrl.dismiss(1);
  }

  getAppointmentDate(): string {
    if (!this.appointment) return '';

    let date: Date = new Date(this.appointment.date);

    return date.toLocaleDateString('en-US');
  }

  getAppointmentTimeRange(): string {
    if (!this.appointment) return '';

    let date: Date = new Date(this.appointment.date);
    let hours = Math.floor(this.appointment.startTime);
    let minutes = (this.appointment.startTime - hours)*60;
    date.setHours(hours);
    date.setMinutes(minutes);

    const startTimeString = this.dataService.getHourRepresentation(date.getHours() + date.getMinutes()/60);

    hours = Math.floor(this.appointment.endTime);
    minutes = (this.appointment.endTime - hours)*60;
    date.setHours(hours);
    date.setMinutes(minutes);

    const endTimeString = this.dataService.getHourRepresentation(date.getHours() + date.getMinutes()/60);

    return `${startTimeString} - ${endTimeString}`;
  }
}
