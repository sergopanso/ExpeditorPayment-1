import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { HelpersService } from 'src/app/services/helpers.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  invoice: any;
  private storageKey: 'payments';
  private payment: number;
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private config: ConfigService, private helpers: HelpersService, private location: Location) {
  }

  ngOnInit() {
    this.invoice = this.storage.invoice;
    this.payment = Number.parseFloat(this.invoice.total.replace(' ', ''));
  }
  handlePayment(e) {
    this.payment = e.target.value;
  }
  save() {
    const payments = this.storage.getLocalStorageList(this.storageKey);
    if (this.payment > 0) {
      this.invoice.payment = this.payment;
      this.invoice.isSaved = null;
      payments.push(this.invoice);
      this.storage.setLocalStorageList(this.storageKey, payments);
      this.storage.invoice = null;
      this.router.navigate(['tabs/expeditors/invoices']);
    }
  }
  swipeleftHandler() {
    this.location.back();
  }
}
