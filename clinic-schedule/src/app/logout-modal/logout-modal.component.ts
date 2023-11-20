import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService, SystemUser } from '../services/data.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
})
export class LogoutModalComponent implements OnInit {
  @Input() profile?: SystemUser;

  constructor(private dataService: DataService, private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss();
  }

  logout() {
    this.dataService.removeCurrentUser();
    this.dataService.updatePhysicanName('');
    this.router.navigate(['/login']);
    this.modalCtrl.dismiss();
  }
}
