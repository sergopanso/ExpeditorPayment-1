import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {

  customerId: string;
  customerTitle: string;
  data: any[];
  isLoading: boolean;
  private routeData: string;
  private payments: any[];
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private config: ConfigService, private helpers: HelpersService, private location: Location) {
    this.data = [];
    this.routeData = 'invoices';
    this.events.tabButtonActivate.subscribe(action => {
      if (action === 'cart') {
        this.update();
      }
    });
  }

  ngOnInit() {
    this.update();
  }
  update() {
    // tslint:disable-next-line:max-line-length
    this.customerId = this.storage.customer ? this.storage.customer.id : '';
    // tslint:disable-next-line:max-line-length
    this.customerTitle = this.storage.customer ? this.storage.customer.title : '';
    this.payments = JSON.parse(localStorage.getItem(this.storage.paymentsStorageKey)) || [];
    if (this.customerId) {
      this.refresh();
    }
  }
  refresh() {
    this.storage.getDataList(this.routeData, { customerId: this.customerId }).subscribe(result => {
      if (result && Array.isArray(result) && result.length > 0) {
        this.data = result.map(item => {
          item.total = this.helpers.numberWithSpaces((Math.round(item.total * 100)) / 100);
          item.docDateTitle = `${item.docDateTitle.split('.')[0]}.${item.docDateTitle.split('.')[1]}`;
          item.isPayment = this.payments.findIndex(payment => payment.docNo === item.docNo) > -1;
          return item;
        });
      } else {
        this.data = [];
      }
    },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }
  async download() {
    this.storage.clearData();
    this.refresh();
  }
  invoice(e) {
    if (e) {
      console.log(e);
      this.storage.invoice = e;
      this.events.notifyTabButtonActivate('cash');
      this.router.navigate(['tabs/expeditors/payment']);
    }
  }
  swipeleftHandler() {
    this.router.navigate(['tabs/expeditors/customers']);
  }
}
