import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';
import { MyApp } from './app.component';

import { Homepage } from '../pages/homepage/homepage';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ManualEntryPage } from '../pages/manual-entry/manual-entry';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';
import { DeviceMotion } from '@ionic-native/device-motion';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpModule } from '@angular/http';
import { NativeAudio } from '@ionic-native/native-audio';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { NativeStorage } from '@ionic-native/native-storage';
import { RequestService } from './request.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { Dropbox } from '../providers/dropbox/dropbox';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import * as Cloudinary from 'cloudinary-core';

@NgModule({
  declarations: [
    Homepage,
    ListPage,
    LoginPage,
    ManualEntryPage,
    MapPage,
    MyApp,
  ],
  imports: [
    BrowserModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dbfuuafr7' }),
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Homepage,
    ListPage,
    LoginPage,
    ManualEntryPage,
    MapPage,
    MyApp,
  ],
  providers: [
    Camera,
    DeviceMotion,
    Dropbox,
    Facebook,
    Geolocation,
    GoogleMaps,
    NativeAudio,
    NativeGeocoder,
    NativeStorage,
    TextToSpeech,
    RequestService,
    SocialSharing,
    SplashScreen,
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ],
})
export class AppModule {}
