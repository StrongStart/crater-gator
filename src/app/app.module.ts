import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';
import { MyApp } from './app.component';

import { DashPage } from '../pages/dash/dash';
import { Homepage } from '../pages/homepage/homepage';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleMaps } from '@ionic-native/google-maps';
import { DeviceMotion } from '@ionic-native/device-motion';
import { NativeAudio } from '@ionic-native/native-audio'
import { Geolocation } from '@ionic-native/geolocation'
import { HttpModule } from '@angular/http'
import { RequestService } from './request.service'
import { SmartAudio } from '../providers/smart-audio/smart-audio'
import { TextToSpeech } from '@ionic-native/text-to-speech'
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@NgModule({
  declarations: [
    DashPage,
    Homepage,
    ListPage,
    LoginPage,
    MapPage,
    MyApp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DashPage,
    Homepage,
    ListPage,
    LoginPage,
    MapPage,
    MyApp
  ],
  providers: [
    DeviceMotion,
    Facebook,
    Geolocation,
    GoogleMaps,
    NativeAudio,
    NativeGeocoder,
    TextToSpeech,
    RequestService,
    SmartAudio,
    SocialSharing,
    SplashScreen,
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
