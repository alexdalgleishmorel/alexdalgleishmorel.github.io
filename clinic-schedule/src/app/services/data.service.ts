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
        endTime: 11,
        physicianName: 'Dr. Test',
        patient: {
          firstName: 'Billy',
          lastName: 'Stuartson',
          phoneNumber: '123456789'
        },
        notes: '',
        checkedIn: false
      }
    ]
  };

  private twelveHourRepresentation: boolean = false;

  constructor() {
    this.dateRanges = this.getDateRanges();
  }

  public isTwelveHourRepresentation(): boolean {
    return this.twelveHourRepresentation;
  }

  public setTwelveHourRepresentation(value: boolean) {
    this.twelveHourRepresentation = value;
  }

  public getCurrentUser () {
    return this.currentUser;
  }

  public getRawHourRepresentations(): number[] {
    return this.hourNumbers;
  }

  public getHourStringRepresentations(): string[] {
    return this.hourNumbers.map(number => this.getHourRepresentation(number));
  }

  public getPhysicianName(): string {
    return this.physician;
  }

  private getDateRanges(): DateRange[] {

    // ADDING FUTURE DATES
    let currentDate = new Date;
    const numOfWeeksToGenerate: number = 52;
    let futureDateRanges: DateRange[] = [];

    for (let i = 0; i < numOfWeeksToGenerate; i ++) {
      let mondayNumberValue = currentDate.getDate() - currentDate.getDay() + 1;
      let sundayNumberValue = mondayNumberValue + 6;
      
      let mondayDate = new Date(currentDate.setDate(mondayNumberValue));
      let sundayDate = new Date(currentDate.setDate(sundayNumberValue));

      futureDateRanges.push({ 
        startDate: mondayDate.toLocaleDateString('en-US'), 
        endDate: sundayDate.toLocaleDateString('en-US') 
      });
      currentDate.setDate(sundayDate.getDate()+1);
    }

    // ADDING PAST DATES
    currentDate = new Date;
    currentDate.setFullYear(currentDate.getFullYear()-1);
    let pastDateRanges: DateRange[] = [];

    for (let i = 0; i < numOfWeeksToGenerate; i ++) {
      let mondayNumberValue = currentDate.getDate() - currentDate.getDay() + 1;
      let sundayNumberValue = mondayNumberValue + 6;
      
      let mondayDate = new Date(currentDate.setDate(mondayNumberValue));
      let sundayDate = new Date(currentDate.setDate(sundayNumberValue));

      pastDateRanges.push({ 
        startDate: mondayDate.toLocaleDateString('en-US'), 
        endDate: sundayDate.toLocaleDateString('en-US') 
      });
      currentDate.setDate(sundayDate.getDate()+1);
    }

    return pastDateRanges.concat(futureDateRanges);
  }

  public getSchedule(dateString: string) {
    return this.schedule[dateString] || [];
  }

  public getHourRepresentation(hourNumber: number) {
    var date = new Date();
    date.setHours(hourNumber);
    date.setMinutes(0);
    return date.toLocaleTimeString('en-US', { 
      hour12: this.twelveHourRepresentation, 
      hour: this.twelveHourRepresentation ? 'numeric' : '2-digit', 
      minute: '2-digit' 
    });
  }
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

export interface Appointment {
  date: string;
  startTime: number;
  endTime: number;
  physicianName: string;
  patient: Patient;
  notes: string;
  checkedIn: boolean;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}
