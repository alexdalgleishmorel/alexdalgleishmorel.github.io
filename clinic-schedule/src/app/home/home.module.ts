import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

import { CancelAppointmentModalComponent } from '../components/cancel-appointment-modal/cancel-appointment-modal.component';
import { CalendarViewComponent } from '../components/calendar-view/calendar-view.component';
import { CreateAppointmentModalComponent } from '../components/create-appointment-modal/create-appointment-modal.component';
import { DateSelectionModalComponent } from '../components/date-selection-modal/date-selection-modal.component';
import { ForgotPasswordModalComponent } from '../components/forgot-password-modal/forgot-password-modal.component';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { PatientNameListComponent } from '../patient-name-list/patient-name-list.component';
import { PatientSearchModalComponent } from '../patient-search-modal/patient-search-modal.component';
import { ViewAppointmentModalComponent } from '../components/view-appointment-modal/view-appointment-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    CancelAppointmentModalComponent,
    CalendarViewComponent,
    CreateAppointmentModalComponent,
    DateSelectionModalComponent,
    ForgotPasswordModalComponent,
    LogoutModalComponent,
    PatientNameListComponent,
    PatientSearchModalComponent,
    ViewAppointmentModalComponent
  ]
})
export class HomePageModule {}
