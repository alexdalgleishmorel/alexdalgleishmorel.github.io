import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Appointment, DataService } from '../services/data.service';

@Component({
  selector: 'app-patient-search-modal',
  templateUrl: './patient-search-modal.component.html',
  styleUrls: ['./patient-search-modal.component.scss'],
})
export class PatientSearchModalComponent implements OnInit {

  public appointments: Appointment[] = [];
  public unfilteredAppointments: Appointment[] = [];

  constructor(private dataService: DataService, private modalCtrl: ModalController) {}

  ngOnInit() {
    const schedule = this.dataService.getSchedule();
    for (let date in schedule) {
      this.appointments = this.appointments.concat(schedule[date]);
    }
    this.unfilteredAppointments = this.appointments;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

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

  handleSearch(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.appointments = this.unfilteredAppointments;

    if (!searchValue) {
      return;
    }

    const filteredData = this.appointments.filter(
      (appointment: Appointment) => {
        return appointment.patient.firstName.concat(' ').concat(appointment.patient.lastName).toLowerCase().includes(searchValue);
      }
    );
    this.appointments = filteredData;
  }

  public onItemSelect(appointment: Appointment) {
    let selectedDate: Date = new Date(appointment.date);

    let index: number = 0;
    for (let dateRange of this.dataService.dateRanges) {
      let startDate: Date = new Date(dateRange.startDate);
      let endDate: Date = new Date(dateRange.endDate);

      if (selectedDate >= startDate && selectedDate <= endDate) {
        this.dataService.dateRangeIndex.next(index);
        this.modalCtrl.dismiss();
        return;
      }

      index++;
    }
  }
}
