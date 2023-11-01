import { Component, Input, OnInit } from '@angular/core';
import { Appointment, DataService } from '../services/data.service';

@Component({
  selector: 'app-patient-name-list',
  templateUrl: './patient-name-list.component.html',
  styleUrls: ['./patient-name-list.component.scss'],
})
export class PatientNameListComponent implements OnInit {
  @Input() appointments: Appointment[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  getAppointmentTimeRange(appointment: Appointment): string {
    let date: Date = new Date(appointment.date);
    let hours = Math.floor(appointment.startTime);
    let minutes = (appointment.startTime - hours)*60;
    date.setHours(hours);
    date.setMinutes(minutes);

    const startTimeString = this.dataService.getHourRepresentation(date.getHours() + date.getMinutes()/60);

    hours = Math.floor(appointment.endTime);
    minutes = (appointment.endTime - hours)*60;
    date.setHours(hours);
    date.setMinutes(minutes);

    const endTimeString = this.dataService.getHourRepresentation(date.getHours() + date.getMinutes()/60);

    return `${startTimeString} - ${endTimeString}`;
  }
}
