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
  public healthNumberFormControl: FormControl = new FormControl();
  public notesFormControl: FormControl = new FormControl();

  public formGroup: FormGroup = this.formBuilder.group({
    startTimeFormControl: this.startTimeFormControl,
    endTimeFormControl: this.endTimeFormControl,
    firstNameFormControl: this.firstNameFormControl,
    lastNameFormControl: this.lastNameFormControl,
    phoneNumberFormControl: this.phoneNumberFormControl,
    healthNumberFormControl: this.healthNumberFormControl,
    notesFormControl: this.notesFormControl
  });

  public timeLabels: string[];

  private startTimeNumber: number = 0;
  private endTimeNumber: number = 0;

  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController, 
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.timeLabels = this.dataService.getAllHourStringRepresentations();

    this.startTimeFormControl.valueChanges.subscribe(startTime => {
      this.startTimeNumber = this.dataService.timeLabelToRawHour(startTime);
    });

    this.endTimeFormControl.valueChanges.subscribe(endTime => {
      this.endTimeNumber = this.dataService.timeLabelToRawHour(endTime);
    });
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
    this.startTimeNumber = this.startTime!.getHours();
    const endTime = this.startTime ? new Date(this.startTime) : new Date();
    if (endTime.getMinutes() === 30) {
      endTime.setHours(endTime.getHours() + 1);
      endTime.setMinutes(0);
    } else {
      endTime.setMinutes(30)
    }
    const endTimeString = this.dataService.getHourRepresentation(endTime.getHours() + endTime.getMinutes()/60);
    this.endTimeNumber = endTime.getHours() + endTime.getMinutes()/60;

    this.dateString = dateString;
    this.startTimeFormControl.setValue(startTimeString);
    this.endTimeFormControl.setValue(endTimeString);
  }

  private initExistingAppointment(appointment: Appointment) {
    this.dateString = appointment.date;
    this.startTimeFormControl.setValue(this.dataService.getHourRepresentation(appointment.startTime));
    this.startTimeNumber = appointment.startTime;
    this.endTimeFormControl.setValue(this.dataService.getHourRepresentation(appointment.endTime));
    this.endTimeNumber = appointment.endTime;
    this.firstNameFormControl.setValue(appointment.patient.firstName);
    this.lastNameFormControl.setValue(appointment.patient.lastName);
    this.phoneNumberFormControl.setValue(appointment.patient.phoneNumber)
    this.healthNumberFormControl.setValue(appointment.patient.healthNumber);
    this.notesFormControl.setValue(appointment.notes);
  }

  cancel() {    
    this.modalCtrl.dismiss(false);
  }

  async confirm() {
    const generatedAppointment: Appointment = {
      id: this.appointment ? this.appointment.id : this.dataService.generateRandomString(),
      date: this.dateString,
      startTime: this.startTimeNumber,
      endTime: this.endTimeNumber,
      patient: {
        firstName: this.firstNameFormControl.getRawValue(),
        lastName: this.lastNameFormControl.getRawValue(),
        phoneNumber: this.phoneNumberFormControl.getRawValue(),
        healthNumber: this.healthNumberFormControl.getRawValue()
      },
      physicianName: this.dataService.physicianName.getValue(),
      notes: this.notesFormControl.getRawValue(),
      checkedIn: false
    };

    if (!this.appointment) {
      this.dataService.createAppointment(generatedAppointment);

      const toast = await this.toastController.create({
        message: 'Appointment has been successfully created',
        duration: 3000,
        position: 'top',
        color: 'success',
        cssClass: 'centeredToast'
      });
      await toast.present();
    } else {
      this.dataService.updateAppointment(generatedAppointment);
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
      && this.phoneNumberFormControl.getRawValue()
      && this.healthNumberFormControl.getRawValue();
  }

  public getStartTimes(): string[] {
    let timeLabels = [];
    for (let i = 0; i < this.timeLabels.length; i++) {
      if (this.dataService.timeLabelToRawHour(this.timeLabels[i]) < this.endTimeNumber) {
        timeLabels.push(this.timeLabels[i]);
      }
    }
    return timeLabels;
  }

  public getEndTimes(): string[] {
    let timeLabels = [];
    for (let i = this.timeLabels.length-1; i >= 0; i--) {
      if (this.dataService.timeLabelToRawHour(this.timeLabels[i]) > this.startTimeNumber) {
        timeLabels.push(this.timeLabels[i]);
      }
    }
    return timeLabels.reverse();
  }
}
