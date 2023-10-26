import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['home']);
  }

  async forgotPassword() {
    const toast = await this.toastController.create({
      message: 'A password reset link has been sent to your email',
      duration: 3000,
      position: 'top',
      cssClass: 'forgotEmailToast'
    });

    await toast.present();
  }
}
