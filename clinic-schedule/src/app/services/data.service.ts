import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  public dateRanges: DateRange[];
  public hourNumbers: number[] = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5];

  private schedule: {[date: string]: Appointment[]} = {
    '10/28/2023': [
      {
        date: '10/28/2023',
        startTime: 9,
        endTime: 11.5,
        physicianName: 'Dr. Dalgleish',
        patient: {
          firstName: 'Billy',
          lastName: 'Stuartson',
          phoneNumber: '123456789'
        },
        notes: '',
        checkedIn: false
      }
    ],
    '10/31/2023': [
      {
        date: '10/31/2023',
        startTime: 9,
        endTime: 11.5,
        physicianName: 'Dr. Test',
        patient: {
          firstName: 'Billy',
          lastName: 'Stuartson',
          phoneNumber: '123456789'
        },
        notes: '',
        checkedIn: false
      }
    ],
    '11/1/2023': [
      {
        date: '11/1/2023',
        startTime: 12,
        endTime: 13,
        physicianName: 'Dr. Test',
        patient: {
          firstName: 'Alex',
          lastName: 'Honold',
          phoneNumber: '123456789'
        },
        notes: '',
        checkedIn: false
      }
    ],
    '11/5/2023': [
      {
        date: '11/5/2023',
        startTime: 14,
        endTime: 15.5,
        physicianName: 'Dr. Test',
        patient: {
          firstName: 'John',
          lastName: 'Smith',
          phoneNumber: '123456789'
        },
        notes: '',
        checkedIn: false
      }
    ],
    '12/5/2023': [
      {
        date: '12/5/2023',
        startTime: 9,
        endTime: 13,
        physicianName: 'Dr. Test',
        patient: {
          firstName: 'Lebron',
          lastName: 'James',
          phoneNumber: '123456789'
        },
        notes: '',
        checkedIn: false
      }
    ]
  };

  private physicianNameList: string[] = [
    'Dr. Dalgleish',
    'Dr. Beljic',
    'Dr. Zhang',
    'Dr. Cameron',
    'Dr. Tariq'
  ];

  private twelveHourRepresentation: boolean = false;

  public dateRangeIndex: BehaviorSubject<number> = new BehaviorSubject<number>(52);

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

  public getPhysicianNameList(): string[] {
    return this.physicianNameList;
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

  public getScheduleByDate(dateString: string) {
    return this.schedule[dateString] || [];
  }

  public getSchedule(): {[date: string]: Appointment[]} {
    return this.schedule;
  }

  public getHourRepresentation(hourNumber: number) {
    var date = new Date();
    let hours = Math.floor(hourNumber);
    let minutes = (hourNumber - hours)*60;
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString('en-US', { 
      hour12: this.twelveHourRepresentation, 
      hour: this.twelveHourRepresentation ? 'numeric' : '2-digit', 
      minute: '2-digit' 
    });
  }

  public getSystemUser(): SystemUser {
    return this.currentUser;
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
