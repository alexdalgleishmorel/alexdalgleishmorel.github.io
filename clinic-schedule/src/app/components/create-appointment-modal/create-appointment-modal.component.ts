import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

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

  constructor(private dataService: DataService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.dateString = this.date ? this.date.toLocaleDateString() : '';
    this.startTimeString = this.startTime ? this.dataService.getHourRepresentation(this.startTime.getHours()) : '';
    this.endTime = this.startTime ? new Date(this.startTime) : new Date();
    this.endTime.setHours(this.endTime.getHours()+1);
    this.endTimeString = this.endTime ? this.dataService.getHourRepresentation(this.endTime.getHours()) : '';
  }

  cancel() {    
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
  }
}
