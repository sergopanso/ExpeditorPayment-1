import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  expeditorId: string;
  expeditorTitle: string;
  data: any[];
  isLoading: boolean;
  private routeData: string;
  private isFilter: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private config: ConfigService, private location: Location) {
    this.data = [];
    this.routeData = 'customers';
    this.isFilter = true;
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.expeditorId = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : this.storage.expeditor && this.storage.expeditor.id;
    // tslint:disable-next-line:max-line-length
    this.expeditorTitle = this.route.snapshot.paramMap.get('title') ? this.route.snapshot.paramMap.get('title') : this.storage.expeditor && this.storage.expeditor.title;
    console.log(this.expeditorId);
    if (this.expeditorId) {
      this.refresh();
    }
  }
  refresh() {
    this.storage.getDataList(this.routeData, { expeditorId: this.expeditorId }).subscribe(result => {
      if (result && Array.isArray(result) && result.length > 0) {
        this.data = result.map(item => {
          item.done = false;
          item.orderTitle = (item.minOrder === item.maxOrder ? `${item.minOrder}` : `${item.minOrder}-${item.maxOrder}`);
          return item;
        });
      }
    },
      error => {
        console.log(error);
        if (error.status && error.status === 401) {
          this.events.notifyRefreshToken(this.routeData);
        } else {
          this.isLoading = false;
        }
      });
  }
  async download() {
    // this.storage.clearData();
    this.refresh();
  }
  filter() {
      this.data = this.data.filter(item => true);
  }
  invoices(e) {
    if (e) {
      this.storage.customer = e;
      e.expeditorId = this.expeditorId;
      this.router.navigate(['tabs/expeditors/invoices', e]);
    }
  }
  swipeleftHandler() {
    this.location.back();
  }
}
