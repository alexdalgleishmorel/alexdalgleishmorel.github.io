import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

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
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private dataService: DataService
  ) {}

  ngOnInit() {
  }

  login() {
    const enteredUsername = this.usernameFormControl.value;
    const enteredPassword = this.passwordFormControl.value;
  
    if (
      (enteredUsername === 'alex' && enteredPassword === 'qwerty') ||
      (enteredUsername === 'bryant' && enteredPassword === 'qwerty') ||
      (enteredUsername === 'gabriel' && enteredPassword === 'qwerty') ||
      (enteredUsername === 'stevan' && enteredPassword === 'qwerty') ||
      (enteredUsername === 'umair' && enteredPassword === 'qwerty')
    ) {
      this.dataService.updateCurrentUser(enteredUsername, enteredPassword);
  
      this.router.navigate(['home']);
    } else {

      this.invalidCredentialsToast('Invalid username or password');
    }
  }

  async invalidCredentialsToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
      cssClass: 'centeredToast'
    });
    toast.present();
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
