import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-selection-modal',
  templateUrl: './date-selection-modal.component.html',
  styleUrls: ['./date-selection-modal.component.scss'],
})
export class DateSelectionModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss();
  }
}
