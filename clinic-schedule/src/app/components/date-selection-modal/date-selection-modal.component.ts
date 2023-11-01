import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService, DateRange } from 'src/app/services/data.service';

@Component({
  selector: 'app-date-selection-modal',
  templateUrl: './date-selection-modal.component.html',
  styleUrls: ['./date-selection-modal.component.scss'],
})
export class DateSelectionModalComponent implements OnInit {

  private minDate: Date;
  private maxDate: Date;
  public maxDateString: String;
  public minDateString: String;

  constructor(private dataService: DataService, private modalCtrl: ModalController) {
    this.minDate = new Date(this.dataService.dateRanges[0].startDate);
    this.maxDate = new Date(this.dataService.dateRanges[this.dataService.dateRanges.length-1].endDate);

    this.minDateString = this.minDate.toISOString().split('T')[0];
    this.maxDateString = this.maxDate.toISOString().split('T')[0];
  }

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss();
  }

  onDateChange(dateChangeEvent: any) {
    let selectedDateString: string = dateChangeEvent.detail.value.split('T')[0].replaceAll('-', '/');
    let selectedDate: Date = new Date(selectedDateString);

    let index: number = 0;
    for (let dateRange of this.dataService.dateRanges) {
      let startDate: Date = new Date(dateRange.startDate);
      let endDate: Date = new Date(dateRange.endDate);

      if (selectedDate >= startDate && selectedDate <= endDate) {
        this.dataService.dateRangeIndex.next(index);
        this.modalCtrl.dismiss();
        return;
      }

      index++;
    }
  }
}
