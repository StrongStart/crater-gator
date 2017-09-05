import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';
import { MyApp } from './app.component';

import { Homepage } from '../pages/homepage/homepage';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { GoogleMaps } from '@ionic-native/google-maps';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DeviceMotion } from '@ionic-native/device-motion';
import { NativeAudio } from '@ionic-native/native-audio'
import { Geolocation } from '@ionic-native/geolocation'
import { HttpModule } from '@angular/http'
import { RequestService } from './request.service'
import { SmartAudio } from '../providers/smart-audio/smart-audio'
import { TextToSpeech } from '@ionic-native/text-to-speech'

@NgModule({
  declarations: [
    MyApp,
    Homepage,
    MapPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Homepage,
    MapPage,
    ListPage
  ],
  providers: [
    NativeAudio,
    TextToSpeech,
    DeviceMotion,
    RequestService,
    Geolocation,
    StatusBar,
    GoogleMaps,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SmartAudio
  ]
})
export class AppModule {}
