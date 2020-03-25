import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  private payments: any[];
  // tslint:disable-next-line:max-line-length
  constructor(private storage: StorageService, private events: EventsService, private router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private config: ConfigService, private location: Location, private httpService:HttpService) {
    this.payments = JSON.parse(localStorage.getItem(this.storage.paymentsStorageKey)) || [] ;
  }

  ngOnInit() { }

  swipeleftHandler() {
    this.location.back();
  }
  save(){
    const paymentsToSave =  this.payments.filter(payment=>payment.isSaved);
    if(paymentsToSave.length > 0)
    {
        this.httpService.savePayment(paymentsToSave).subscribe(()=>{
          this.payments = this.payments.map(payment=>{
            payment.isSaved = true;
            return payment;
          });
          localStorage.setItem(this.storage.paymentsStorageKey,JSON.stringify(this.payments));
        })
          
      }
    }
  }
