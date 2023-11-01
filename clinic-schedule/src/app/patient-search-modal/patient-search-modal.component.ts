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
}
