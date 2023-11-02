import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usernameFormControl: FormControl<string> = new FormControl();
  public passwordFormControl: FormControl<string> = new FormControl();

  public formGroup: FormGroup = this.formBuilder.group({
    usernameFormControl: this.usernameFormControl,
    passwordFormControl: this.passwordFormControl
  });

  constructor(
    private router: Router, 
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {}

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

  canLogin(): boolean {
    return this.formGroup.valid && !!this.usernameFormControl.getRawValue() && !!this.passwordFormControl.getRawValue();
  }
}
