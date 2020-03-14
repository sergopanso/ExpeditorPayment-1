import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  private payments: any[];
  private storageKey: 'payments';
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private config: ConfigService, private location: Location) {
    this.payments = this.storage.getLocalStorageList(this.storageKey);
  }

  ngOnInit() { }

  swipeleftHandler() {
    this.location.back();
  }
}
