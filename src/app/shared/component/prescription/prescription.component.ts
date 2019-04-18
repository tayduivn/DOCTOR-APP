import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
})
export class PrescriptionComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }
  
  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}

}