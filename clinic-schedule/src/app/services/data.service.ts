import { Injectable } from '@angular/core';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentUser: SystemUser = {
    firstName: 'Alex',
    lastName: 'Dalgleish',
    role: UserRole.NURSE
  };

  constructor() { }

  public getCurrentUser () {
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
  time: string;
  physician: SystemUser;
  patient: Patient;
  notes: string;
  status: AppointmentStatus;
}
