import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Location } from '@angular/common';
import { zip } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {


  data: any[];
  isLoading: boolean;
  private routeData = 'customers';
  private routeDataIvoices = 'invoices';
  private isFilter: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private config: ConfigService, private location: Location) {
    this.data = [];
    this.isFilter = true;
  }

  ngOnInit() {
    this.events.refresh.subscribe(data => {
      if (data === 'customers') {
        this.refresh();
      }
    });
    this.refresh();
  }
  refresh() {
    this.storage.getDataList(this.routeData).subscribe(result => {
      if (result && Array.isArray(result) && result.length > 0) {
        if (!this.storage.expeditor) {
          this.storage.expeditor = JSON.parse(localStorage.getItem('expeditor'));
        }
        this.data = result.map(item => {
          item.done = false;
          item.orderTitle = (item.minOrder === item.maxOrder ? `${item.minOrder}` : `${item.minOrder}-${item.maxOrder}`);
          return item;
        });
        this.refreshInvoices(this.data);
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
  filter() {
    this.data = this.data.filter(item => true);
  }
  invoices(e) {
    if (e) {
      this.storage.customer = e;
      this.events.notifyTabButtonActivate('cart');
      this.router.navigate(['tabs/expeditors/invoices', e]);
    }
  }
  swipeleftHandler() {
    this.location.back();
  }
  refreshInvoices(customers) {
    const customers$ = customers.map(customer => this.storage.getDataList(this.routeDataIvoices, { customerId: customer.id }));
    zip(...customers$).subscribe();
  }
  saveInvoice() {
  }
}
