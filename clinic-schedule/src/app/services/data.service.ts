import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentUser: SystemUser = {
    firstName: 'Alex',
    lastName: 'Dalgleish',
    role: UserRole.NURSE,
    email: 'alex@local.com'
  };
  public physician: string = 'Test Doctor';

  public dateRanges: DateRange[];
  public hourNumbers: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  private schedule: {[date: string]: Appointment[]} = {
    '10/28/2023': [
      {
        date: '10/28/2023',
        startTime: 9,
        endTime: 10,
        physicianName: 'Dr. Test',
        patient: {
          firstName: 'Billy',
          lastName: 'Bob',
          phoneNumber: '123456789'
        },
        notes: '',
        status: AppointmentStatus.SCHEDULED
      }
    ]
  };

  constructor() {
    this.dateRanges = this.getDateRanges();
  }

  public getCurrentUser () {
    return this.currentUser;
  }

  public getRawHourRepresentations(): number[] {
    return this.hourNumbers;
  }

  public getHourStringRepresentations(): string[] {
    return this.hourNumbers.map(number => getDate(number));
  }

  public getPhysicianName(): string {
    return this.physician;
  }

  private getDateRanges(): DateRange[] {
    let currentDate = new Date;
    const numOfWeeksToGenerate: number = 52;
    let dateRanges: DateRange[] = [];

    for (let i = 0; i < numOfWeeksToGenerate; i ++) {
      let mondayNumberValue = currentDate.getDate() - currentDate.getDay() + 1;
      let sundayNumberValue = mondayNumberValue + 6;
      
      let mondayDate = new Date(currentDate.setDate(mondayNumberValue));
      let sundayDate = new Date(currentDate.setDate(sundayNumberValue));

      dateRanges.push({ 
        startDate: mondayDate.toLocaleDateString('en-US'), 
        endDate: sundayDate.toLocaleDateString('en-US') 
      });
      currentDate.setDate(sundayDate.getDate()+1);
    }

    return dateRanges;
  }

  public getSchedule(dateString: string) {
    // console.log(dateString);
    // console.log(this.schedule);
    return this.schedule[dateString] || [];
  }
}

function getDate(hourNumber: number) {
  var date = new Date();
  date.setHours(hourNumber);
  date.setMinutes(0);
  return date.toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" });
}

export enum UserRole {
  NURSE = 'NURSE',
  PHYSICIAN = 'PHYSICIAN',
  RECEPTIONIST = 'RECEPTIONIST'
}

export interface SystemUser {
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
}

export interface Patient {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  CANCELED = 'CANCELED'
}

export interface Appointment {
  date: string;
  startTime: number;
  endTime: number;
  physicianName: string;
  patient: Patient;
  notes: string;
  status: AppointmentStatus;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}
