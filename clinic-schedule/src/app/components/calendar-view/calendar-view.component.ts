import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateAppointmentModalComponent } from '../create-appointment-modal/create-appointment-modal.component';
import { Appointment, DataService, DateRange } from 'src/app/services/data.service';
import { ViewAppointmentModalComponent } from '../view-appointment-modal/view-appointment-modal.component';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {

  @Input() dateRangeIndex: number = 0;

  public timeLabels: string[];
  public hourToggleValue: boolean = false;

  constructor(private dataService: DataService, private modalCtrl: ModalController) {
    this.timeLabels = this.dataService.getHourStringRepresentations();
    this.hourToggleValue = this.dataService.isTwelveHourRepresentation();
  }

  ngOnInit() {}

  public onHourToggleChange(event: any) {
    this.dataService.setTwelveHourRepresentation(event.detail.checked);
    this.timeLabels = this.dataService.getHourStringRepresentations();
  }

  async onTimeslotSelect(weekdayIndex: number, timeSlotIndex: number) {
    let appointment = this.getAppointment(weekdayIndex, timeSlotIndex);
    if (!appointment) {
      const modal = await this.modalCtrl.create({
        component: CreateAppointmentModalComponent,
        componentProps: {
          date: this.getWeekdayDate(weekdayIndex),
          startTime: this.getTimeslotDate(weekdayIndex, timeSlotIndex)
        }
      });
      modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: ViewAppointmentModalComponent,
        componentProps: {
          appointment: appointment
        }
      });
      modal.present();
    }
  }

  public getWeekdayDate(weekdayIndex: number): Date {
    const dateString: string = this.dataService.dateRanges[this.dateRangeIndex].startDate;
    const date: Date = new Date(dateString);
    date.setDate(date.getDate()+weekdayIndex);
    return date;
  }

  public getTimeslotDate(weekdayIndex: number, timeSlotIndex: number): Date {
    const dateString: string = this.dataService.dateRanges[this.dateRangeIndex].startDate;
    const date: Date = new Date(dateString);
    date.setDate(date.getDate()+weekdayIndex);
    const rawHourRepresentations: number[] = this.dataService.getRawHourRepresentations();

    let hours = Math.floor(rawHourRepresentations[timeSlotIndex])
    let minutes = (rawHourRepresentations[timeSlotIndex] - hours)*60
    date.setHours(date.getHours() + hours);
    date.setMinutes(minutes)
    return date;
  }

  public getDateNumber(weekdayIndex: number): number {
    const date: Date = this.getWeekdayDate(weekdayIndex);
    return date.getDate();
  }

  public getDailySchedule(dateString: string): Appointment[] {
    return this.dataService.getSchedule(dateString);
  }

  public getAppointment(weekdayIndex: number, timeSlotIndex: number) {
    let dateString: string = this.getTimeslotDate(weekdayIndex, timeSlotIndex).toLocaleDateString('en-US');
    const rawHourRepresentation = this.dataService.getRawHourRepresentations()[timeSlotIndex];
    let dailyAppointments: Appointment[] = this.dataService.getSchedule(dateString);
    for (let appointment of dailyAppointments) {
      if (appointment.startTime <= rawHourRepresentation && rawHourRepresentation < appointment.endTime) {
        return appointment;
      }
      // if (appointment.startTime == rawHourRepresentation || appointment.endTime == rawHourRepresentation+1) {
      //   return appointment;
      // }
    }
    return null;
  }

  calculateRowSpan(appointment: Appointment): number {
    const durationInMinutes = (appointment.endTime - appointment.startTime) / (1000 * 60);
    const minutesPerSlot = 30; // adjust based on time slot duration
    return Math.ceil(durationInMinutes / minutesPerSlot);
  }
}
