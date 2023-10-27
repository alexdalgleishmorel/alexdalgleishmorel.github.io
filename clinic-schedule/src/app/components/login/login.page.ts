import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['home']);
  }

  async openForgotPasswordModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordModalComponent
    });
    modal.present();
  }
}
