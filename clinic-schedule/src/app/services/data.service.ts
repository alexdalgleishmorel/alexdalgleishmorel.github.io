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
  public hourNumbers: number[] = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20];

  private schedule: {[date: string]: Appointment[]} = {
    '10/28/2023': [
      {
        date: '10/28/2023',
        startTime: 9,
        endTime: 11,
        physicianName: 'Dr. Test',
        patient: {
          firstName: 'Billy',
          lastName: 'Bob',
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

  /**
   * Returns the timelot hour labels
   * @returns {string[]} Each hour representation, not including the 30 minute marks
   */
  public getHourStringRepresentations(): string[] {
    return this.hourNumbers.map((number, index) => index % 2 === 0 ? this.getHourRepresentation(number) : '');
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
    let hours = Math.floor(hourNumber)
    let minutes = (hourNumber - hours)*60
    date.setHours(hours);
    date.setMinutes(minutes);
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
