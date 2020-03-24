import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { HelpersService } from 'src/app/services/helpers.service';
import {Location} from '@angular/common';

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
  private storageKey: 'payments';
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private config: ConfigService, private helpers: HelpersService, private location: Location) {
    this.data = [];
    this.routeData = 'invoices';
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.customerId = this.storage.customer.id;
    // tslint:disable-next-line:max-line-length
    this.customerTitle = this.storage.customer.title;
    this.payments = JSON.parse(localStorage.getItem(this.storageKey)) ? JSON.parse(localStorage.getItem(this.storageKey)) : [] ;
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
        if (error.status && error.status === 401) {
          this.events.notifyRefreshToken(this.routeData);
        } else {
          this.isLoading = false;
        }
      });
  }
  async download() {
    this.storage.clearData();
    this.refresh();
  }
  invoice(e) {
    if (e) {
      this.storage.invoice = e;
      this.router.navigate(['tabs/expeditors/payment']);
    }
  }
  swipeleftHandler() {
    this.location.back();
  }
}
