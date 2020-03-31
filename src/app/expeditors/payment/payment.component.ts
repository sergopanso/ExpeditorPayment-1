import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  invoice: any;
  private payment: number;
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private config: ConfigService, private helpers: HelpersService, private location: Location) {
    this.events.tabButtonActivate.subscribe(action => {
      if (action === 'cash') {
        this.update();
      }
    });
  }

  ngOnInit() {
    this.update();
  }
  update() {
    this.invoice = this.storage.invoice;
    this.payment = this.storage.invoice ? Number.parseFloat(this.invoice.total.replace(' ', '')) : 0;
  }
  handlePayment(e) {
    this.payment = e.target.value;
  }
  save() {
    // tslint:disable-next-line:max-line-length
    let payments = JSON.parse(localStorage.getItem(this.storage.paymentsStorageKey)) || [];
    if (this.payment > 0) {
      this.invoice.payment = this.payment;
      this.invoice.isSaved = false;
      payments = payments.filter(item => item.docId !== this.invoice.docId);
      payments.push(this.invoice);
      localStorage.setItem(this.storage.paymentsStorageKey, JSON.stringify(payments));
      this.storage.invoice = null;
      this.events.notifyTabButtonActivate('cart');
      this.router.navigate(['tabs/expeditors/invoices']);
    }
  }
  swipeleftHandler() {
    this.location.back();
  }
}
