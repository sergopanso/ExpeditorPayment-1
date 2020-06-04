import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'modal-page',
})
export class ModalPage {

  constructor() {

  }

}
@Component({
  selector: 'app-expeditors',
  templateUrl: './expeditors.component.html',
  styleUrls: ['./expeditors.component.scss'],
})
export class ExpeditorsComponent implements OnInit {

  data: any[];
  private routeData = 'expeditors';
  loading$: Promise<HTMLIonLoadingElement>;
  loading: HTMLIonLoadingElement;
  mapColor = {};
  // tslint:disable-next-line:max-line-length
  color = ['avatar-box avatar-red', 'avatar-box avatar-green', 'avatar-box avatar-purple', 'avatar-box avatar-navy', 'avatar-box avatar-yellow'];
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router,
              private loadingController: LoadingController) {
    this.data = [];
    this.events.refresh.subscribe(data => {
      if (data === this.routeData) {
        this.refresh();
      }
    });
    this.data = [];
    this.loading$ = this.loadingController.create({
      message: 'Загрузка...',
      backdropDismiss: true
    });
  }
  ngOnInit() {
    this.loading$.then(result => {
      this.loading = result;
      this.refresh();
    });
  }
  refresh() {
    this.storage.getDataList(this.routeData).subscribe(result => {
      if (result && Array.isArray(result) && result.length > 0) {
        let counter = 0;
        const that = this;
        this.mapColor = result.reduce((total, item) => {
          if (!total[item.title[0]]) {
            counter++;
            total[item.title[0]] = that.color[counter % 5];
          }
          return total;
        }, {});
        this.data = result;
      } else {
        this.data = [];
      }
    },
      error => {
        console.log(error);
      },
      () => this.loading.dismiss());
  }
  async download() {
    this.storage.clearData();
    this.refresh();
  }
  password(e) {
    if (e) {
      this.storage.expeditor = e;
      localStorage.setItem('expeditor', JSON.stringify(e));
      this.router.navigate(['tabs/expeditors/password']);
    }
    console.log(e);
  }
}
