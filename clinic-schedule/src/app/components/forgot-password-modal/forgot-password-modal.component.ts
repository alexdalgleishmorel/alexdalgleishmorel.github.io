import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
})
export class ForgotPasswordModalComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController
    ) {}

  ngOnInit() {}

  async submit() {
    const toast = await this.toastController.create({
      message: 'A password reset link has been sent to your email',
      duration: 3000,
      position: 'top',
      cssClass: 'centeredToast'
    });

    await toast.present();
    this.modalCtrl.dismiss();
  }
}
