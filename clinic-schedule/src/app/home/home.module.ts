import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

import { CalendarViewComponent } from '../components/calendar-view/calendar-view.component';
import { CreateAppointmentModalComponent } from '../components/create-appointment-modal/create-appointment-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    CalendarViewComponent,
    CreateAppointmentModalComponent
  ]
})
export class HomePageModule {}
