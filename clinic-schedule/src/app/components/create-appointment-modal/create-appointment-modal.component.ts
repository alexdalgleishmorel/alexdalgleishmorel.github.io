import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  public dateString: string = '';
  public startTimeFormControl: FormControl = new FormControl();
  public endTimeFormControl: FormControl = new FormControl();
  public firstNameFormControl: FormControl = new FormControl();
  public lastNameFormControl: FormControl = new FormControl();
  public phoneNumberFormControl: FormControl = new FormControl();
  public notesFormControl: FormControl = new FormControl();

  public formGroup: FormGroup = this.formBuilder.group({
    startTimeFormControl: this.startTimeFormControl,
    endTimeFormControl: this.endTimeFormControl,
    firstNameFormControl: this.firstNameFormControl,
    lastNameFormControl: this.lastNameFormControl,
    phoneNumberFormControl: this.phoneNumberFormControl,
    notesFormControl: this.notesFormControl
  });

  public timeLabels: string[];

  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController, 
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.timeLabels = this.dataService.getAllHourStringRepresentations();
  }

  ngOnInit() {
    if (!this.appointment) {
      this.initNewAppointment();
    } else {
      this.initExistingAppointment(this.appointment);
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

    this.dateString = dateString;
    this.startTimeFormControl.setValue(startTimeString);
    this.endTimeFormControl.setValue(endTimeString);
  }

  private initExistingAppointment(appointment: Appointment) {
    this.dateString = appointment.date;
    this.startTimeFormControl.setValue(this.dataService.getHourRepresentation(appointment.startTime));
    this.endTimeFormControl.setValue(this.dataService.getHourRepresentation(appointment.endTime));
    this.firstNameFormControl.setValue(appointment.patient.firstName);
    this.lastNameFormControl.setValue(appointment.patient.lastName);
    this.phoneNumberFormControl.setValue(appointment.patient.phoneNumber);
    this.notesFormControl.setValue(appointment.notes);
  }

  cancel() {    
    this.modalCtrl.dismiss(false);
  }

  async confirm() {
    if (!this.appointment) {
      const toast = await this.toastController.create({
        message: 'Appointment has been successfully created',
        duration: 3000,
        position: 'top',
        color: 'success',
        cssClass: 'centeredToast'
      });
  
      await toast.present();
    }

    this.modalCtrl.dismiss(true);
  }

  public canConfirmAppointment(): boolean {
    return this.formGroup.valid 
      && !this.formGroup.pristine
      && this.startTimeFormControl.getRawValue() 
      && this.endTimeFormControl.getRawValue() 
      && this.firstNameFormControl.getRawValue() 
      && this.lastNameFormControl.getRawValue() 
      && this.phoneNumberFormControl.getRawValue();
  }
}
