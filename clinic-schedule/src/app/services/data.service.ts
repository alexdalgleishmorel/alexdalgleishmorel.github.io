import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentUser?: SystemUser;

  private loggedIn$ = new BehaviorSubject<boolean>(!!this.currentUser);
  public isLoggedIn$ = this.loggedIn$.asObservable();

  public dateRanges: DateRange[];
  public hourNumbers: number[] = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5];

  private schedule: {[date: string]: Appointment[]} = {
    '11/11/2023': [
      {
        id: '%*bvxdvb',
        date: '11/11/2023',
        physicianName: 'Dr. Dalgleish',
        patient: {
          firstName: 'Steven',
          lastName: 'Smith',
          phoneNumber: '(403)-123-4567',
          healthNumber: '011 854 432'
        },
        startTime: 11,
        endTime: 12.5,
        notes: '',
        checkedIn: false
      }
    ],
    '11/13/2023': [
      {
        id: 'vskjvalse',
        date: '11/13/2023',
        physicianName: 'Dr. Beljic',
        patient: {
          firstName: 'Alex',
          lastName: 'Jameson',
          phoneNumber: '(403)-333-4537',
          healthNumber: '886 453 122'
        },
        startTime: 10,
        endTime: 11.5,
        notes: '',
        checkedIn: false
      }
    ],
    '11/19/2023': [
      {
        id: '*(@!svsv',
        date: '11/19/2023',
        physicianName: 'Dr. Cameron',
        patient: {
          firstName: 'Lisa',
          lastName: 'Moss',
          phoneNumber: '(403)-123-9999',
          healthNumber: '994 382 122'
        },
        startTime: 11,
        endTime: 13,
        notes: '',
        checkedIn: false
      }
    ],
    '11/25/2023': [
      {
        id: 'a%^7sgw',
        date: '11/25/2023',
        physicianName: 'Dr. Dalgleish',
        patient: {
          firstName: 'Brook',
          lastName: 'Lopez',
          phoneNumber: '(403)-321-7654',
          healthNumber: '294 369 846'
        },
        startTime: 13,
        endTime: 15,
        notes: '',
        checkedIn: false
      }
    ],
    '11/29/2023': [
      {
        id: '&*23dvcv',
        date: '11/29/2023',
        physicianName: 'Dr. Dalgleish',
        patient: {
          firstName: 'Kyrie',
          lastName: 'Irving',
          phoneNumber: '(403)-777-1352',
          healthNumber: '236 856 657'
        },
        startTime: 11.5,
        endTime: 14,
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
  public physicianName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public scheduleUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private toastController: ToastController) {
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

  public getAllHourStringRepresentations(): string[] {
    return this.hourNumbers.map(number => this.getHourRepresentation(number));
  }

  public getPhysicianNameList(): string[] {
    return this.physicianNameList;
  }

  private getDateRanges(): DateRange[] {

    // ADDING FUTURE DATES
    let currentDate = new Date();
    const numOfWeeksToGenerate: number = 52;
    let futureDateRanges: DateRange[] = [];

    for (let i = 0; i < numOfWeeksToGenerate; i ++) {

      futureDateRanges.push({ 
        startDate: getMonday(currentDate).toLocaleDateString('en-US'), 
        endDate: getSunday(currentDate).toLocaleDateString('en-US') 
      });

      currentDate.setDate(getSunday(currentDate).getDate()+1);
    }

    // ADDING PAST DATES
    currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear()-1);
    let pastDateRanges: DateRange[] = [];

    for (let i = 0; i < numOfWeeksToGenerate; i ++) {

      pastDateRanges.push({ 
        startDate: getMonday(currentDate).toLocaleDateString('en-US'),
        endDate: getSunday(currentDate).toLocaleDateString('en-US') 
      });
      currentDate.setDate(getSunday(currentDate).getDate()+1);
    }

    return pastDateRanges.concat(futureDateRanges);
  }

  public getScheduleByDate(dateString: string) {
    return this.schedule[dateString]?.filter(appointment => appointment.physicianName === this.physicianName.getValue()) || [];
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

  public getSystemUser(): SystemUser | null {
    return this.currentUser || null;
  }

  public updatePhysicanName(name: string) {
    this.physicianName.next(name);
  }

  public createAppointment(appointment: Appointment): boolean {
    let valid: boolean = true;

    const dailySchedule: Appointment[] = this.schedule[appointment.date] || [];

    dailySchedule.forEach(app => {
      if (this.isOverlap(appointment, app)) {
        this.toastController.create({
          message: 'The new appointment overlaps with an existing appointment. No appointment created.',
          duration: 3000,
          position: 'top',
          color: 'danger',
          cssClass: 'centeredToast'
        }).then(toast => {
          toast.present();
        });
        valid = false;
      }
    });

    if (!valid) {
      return false;
    }

    this.schedule[appointment.date] ? this.schedule[appointment.date].push(appointment) : this.schedule[appointment.date] = [appointment];
    return true;
  }

  private isOverlap(appointment: Appointment, existingAppointment: Appointment) {
    return this.inRange(appointment.startTime, existingAppointment.startTime, existingAppointment.endTime, false) || 
      this.inRange(appointment.endTime, existingAppointment.startTime, existingAppointment.endTime, true) ||
      (appointment.startTime < existingAppointment.startTime && appointment.endTime > existingAppointment.endTime);
  }

  private inRange(value: number, start: number, end: number, checkingEnd: boolean) {
    return checkingEnd ? value > start && value <= end : value >= start && value < end;
  }

  public updateAppointment(appointmentToUpdate: Appointment): boolean {
    let valid: boolean = true;

    const dailySchedule: Appointment[] = this.schedule[appointmentToUpdate.date] || [];

    dailySchedule.forEach(app => {
      if (this.isOverlap(appointmentToUpdate, app) && app.id !== appointmentToUpdate.id) {
        this.toastController.create({
          message: 'The updated appointment overlaps with an existing appointment. No update was made.',
          duration: 3000,
          position: 'top',
          color: 'danger',
          cssClass: 'centeredToast'
        }).then(toast => {
          toast.present();
        });
        valid = false;
      }
    });

    if (!valid) {
      return false;
    }

    for (let day of Object.values(this.schedule)) {
      for (let appointment of day) {
        if (appointment.id === appointmentToUpdate.id) {
          // Now we need to access the actual object to update it
          let index = 0;
          for (let app of this.schedule[appointment.date]) {
            if (app.id === appointment.id) {
              this.schedule[appointment.date][index] = appointmentToUpdate;
              valid = true;
              return true;
            }
            index++;
          }
        }
      }
    }

    return false;
  }

  public cancelAppointment(appointmentToUpdate: Appointment) {
    for (let day of Object.values(this.schedule)) {
      for (let appointment of day) {
        if (appointment.id === appointmentToUpdate.id) {
          // Now we need to access the actual object to update it
          let index = 0;
          for (let app of this.schedule[appointment.date]) {
            if (app.id === appointment.id) {
              delete this.schedule[appointment.date][index];
              return;
            }
            index++;
          }
        }
      }
    }
  }

  public generateRandomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=[]{}|;:,.<>?';
    let result = '';
  
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  public timeLabelToRawHour(timeLabel: string): number {
    let index = 0;
    for (let label of this.getAllHourStringRepresentations()) {
      if (timeLabel === label) {
        return this.getRawHourRepresentations()[index];
      }
      index++;
    }
    return -1;
  }

  updateCurrentUser(enteredUsername: string, enteredPassword: string) {

    let updatedUser: SystemUser | undefined;
  
    if (enteredUsername === 'alex@gmail.com' && enteredPassword === 'cpsc481') {
      updatedUser = {
        firstName: 'Alex',
        lastName: 'Dalgleish',
        role: UserRole.NURSE,
        email: 'alex@gmail.com'
      };
    } else if (enteredUsername === 'bryant@gmail.com' && enteredPassword === 'cpsc481') {
      updatedUser = {
        firstName: 'Bryant',
        lastName: 'Zhang',
        role: UserRole.RECEPTIONIST,
        email: 'bryant@gmail.com'
      };
    } else if (enteredUsername === 'gabriel@gmail.com' && enteredPassword === 'cpsc481') {
      updatedUser = {
        firstName: 'Gabriel',
        lastName: 'Cameron',
        role: UserRole.NURSE,
        email: 'gabriel@gmail.com'
      };
    } else if (enteredUsername === 'stevan@gmail.com' && enteredPassword === 'cpsc481') {
      updatedUser = {
        firstName: 'Stevan',
        lastName: 'Beljic',
        role: UserRole.PHYSICIAN,
        email: 'stevan@gmail.com'
      };
    } else if (enteredUsername === 'umair@gmail.com' && enteredPassword === 'cpsc481') {
      updatedUser = {
        firstName: 'Umair',
        lastName: 'Tariq',
        role: UserRole.RECEPTIONIST,
        email: 'umair@gmail.com'
      };
    }

    if (updatedUser) {
      this.currentUser = updatedUser;
      this.loggedIn$.next(true);
    }
  }

  public removeCurrentUser() {
    this.currentUser = undefined;
    this.loggedIn$.next(false);
  }
}

export enum UserRole {
  NURSE = 'NURSE',
  PHYSICIAN = 'PHYSICIAN',
  RECEPTIONIST = 'RECEPTIONIST',
  BLANK = ''
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
  healthNumber: string;
}

export interface Appointment {
  id: string;
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

function getMonday(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when Sunday
  return new Date(date.setDate(diff));
}

function getSunday(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() + (day === 0 ? 0 : 7 - day); // adjust when Sunday
  return new Date(date.setDate(diff));
}
