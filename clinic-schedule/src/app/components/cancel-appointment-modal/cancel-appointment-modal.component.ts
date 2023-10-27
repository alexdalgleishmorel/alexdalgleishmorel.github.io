import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cancel-appointment-modal',
  templateUrl: './cancel-appointment-modal.component.html',
  styleUrls: ['./cancel-appointment-modal.component.scss'],
})
export class CancelAppointmentModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private toastController: ToastController) {}

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
}
