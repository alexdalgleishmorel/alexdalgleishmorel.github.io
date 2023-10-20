import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrls: ['./create-appointment-modal.component.scss'],
})
export class CreateAppointmentModalComponent implements OnInit {

  @Input() date: string = '';
  @Input() startTime: string = '';
  public endTime: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.endTime = this.startTime;
  }

  cancel() {    
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
  }
}
