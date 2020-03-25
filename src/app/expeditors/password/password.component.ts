import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {

  password: string;
  constructor(private storage: StorageService, private router: Router, private location: Location, private events: EventsService) {

  }
  ngOnInit() { 
    this.password = this.storage.expeditor.code;
  }
  send(e) {
    if (this.password) {
      const data = {
        agentCode: this.storage.expeditor.id,
        password: this.password
      };
      this.storage.setToken(data).subscribe(() => {
        this.events.notifyRefresh('customers');
        this.events.notifyTabButtonActivate('people');
        this.router.navigate(['tabs/expeditors/customers']);
      })
    }
    console.log(e);
  }
  swipeleftHandler() {
    this.location.back();
  }
  handlePayment(e) {
    this.password = e.target.value;
  }
}
