import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { ConfigService } from './services/config.service';
import { EventsService } from './services/events.service';
import { StorageService } from './services/storage.service';
import { HttpModule } from '@angular/http';
import { IonicGestureConfig } from './services/gestures.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule],
  providers: [
    StatusBar,
    SplashScreen,
    ConfigService,
    HttpService,
    EventsService,
    StorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: IonicGestureConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
