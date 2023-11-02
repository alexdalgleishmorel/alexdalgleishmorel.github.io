import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Appointment, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrls: ['./create-appointment-modal.component.scss'],
})
export class CreateAppointmentModalComponent implements OnInit {

  @Input() date?: Date;
  @Input() startTime?: Date;
  @Input() appointment?: Appointment;

  public dateFormControl: FormControl = new FormControl();
  public startTimeFormControl: FormControl = new FormControl();
  public endTimeFormControl: FormControl = new FormControl();
  public firstNameFormControl: FormControl = new FormControl();
  public lastNameFormControl: FormControl = new FormControl();
  public phoneNumberFormControl: FormControl = new FormControl();
  public notesFormControl: FormControl = new FormControl();

  public formGroup: FormGroup = this.formBuilder.group({
    dateFormControl: this.dateFormControl,
    startTimeFormControl: this.startTimeFormControl,
    endTimeFormControl: this.endTimeFormControl,
    firstNameFormControl: this.firstNameFormControl,
    lastNameFormControl: this.lastNameFormControl,
    phoneNumberFormControl: this.phoneNumberFormControl,
    notesFormControl: this.notesFormControl
  });

  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController, 
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.appointment) {
      this.initNewAppointment();
    } else {
      this.initExistingAppointment();
    }
  }

  private initNewAppointment() {
    const dateString = this.date ? this.date.toLocaleDateString() : '';
    const startTimeString = this.startTime ? this.dataService.getHourRepresentation(this.startTime.getHours() + this.startTime.getMinutes()/60) : '';
    const endTime = this.startTime ? new Date(this.startTime) : new Date();
    if (endTime.getMinutes() === 30) {
      endTime.setHours(endTime.getHours() + 1);
      endTime.setMinutes(0);
    } else {
      endTime.setMinutes(30)
    }
    const endTimeString = this.dataService.getHourRepresentation(endTime.getHours() + endTime.getMinutes()/60);

    this.dateFormControl.setValue(dateString);
    this.startTimeFormControl.setValue(startTimeString);
    this.endTimeFormControl.setValue(endTimeString);
  }

  private initExistingAppointment() {
  }

  cancel() {    
    this.modalCtrl.dismiss();
  }

  async confirm() {
    const toast = await this.toastController.create({
      message: 'Appointment has been successfully created',
      duration: 3000,
      position: 'top',
      color: 'success',
      cssClass: 'centeredToast'
    });

    await toast.present();
    this.modalCtrl.dismiss();
  }

  public canConfirmAppointment(): boolean {
    return this.formGroup.valid 
      && this.dateFormControl.getRawValue() 
      && this.startTimeFormControl.getRawValue() 
      && this.endTimeFormControl.getRawValue() 
      && this.firstNameFormControl.getRawValue() 
      && this.lastNameFormControl.getRawValue() 
      && this.phoneNumberFormControl.getRawValue();
  }
}
