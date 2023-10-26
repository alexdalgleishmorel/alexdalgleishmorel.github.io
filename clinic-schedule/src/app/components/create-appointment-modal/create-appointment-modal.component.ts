import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrls: ['./create-appointment-modal.component.scss'],
})
export class CreateAppointmentModalComponent implements OnInit {

  @Input() date?: Date;
  @Input() startTime?: Date;
  public endTime?: Date;

  public dateString: string = '';
  public startTimeString: string = '';
  public endTimeString: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.dateString = this.date ? this.date.toLocaleDateString() : '';
    this.startTimeString = this.startTime ? this.startTime.toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" }) : '';
    this.endTime = this.startTime ? new Date(this.startTime) : new Date();
    this.endTime.setHours(this.endTime.getHours()+1);
    this.endTimeString = this.endTime ? this.endTime.toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" }) : '';
  }

  cancel() {    
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
  }
}
