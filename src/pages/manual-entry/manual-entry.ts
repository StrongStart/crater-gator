import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestService } from '../../app/request.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { NativeStorage } from '@ionic-native/native-storage';

import { Dropbox } from '../../providers/dropbox/dropbox';

@IonicPage()
@Component({
  selector: 'page-manual-entry',
  templateUrl: 'manual-entry.html',
})
export class ManualEntryPage {
  name: string;
  lat: number;
  lng: number;
  location: string = 'Getting current location';
  image: string;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 320,
    targetWidth: 320,
    saveToPhotoAlbum: true,
  };

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private requestService: RequestService,
    private nativeStorage: NativeStorage,
    private camera: Camera,
    public dropbox: Dropbox,
    public navParams: NavParams) {

      this.geolocation.getCurrentPosition().then((resp) => {
        const round = (t, d) => Number(Math.round(Number(t+'e'+d))+'e-'+d);
        this.lat = round(resp.coords.latitude, 4);
        this.lng = round(resp.coords.longitude, 4);
        this.nativeGeocoder.reverseGeocode(this.lat, this.lng)
          .then(res => this.location = `${res.subThoroughfare} ${res.thoroughfare}`)
      }).catch((error) => console.log('Error getting location', error));
  }

  takePicture() {
    // this.dropbox.savePhoto('https://media.myfoxmemphiscom.cmgdigital.com/photo/2017/01/16/gator_20170116171341601_7057460_ver1.0_1280_720.jpg');
    this.camera.getPicture(this.options)
      .then(data => {
        this.image = data
        // this.dropbox.savePhoto(this.image);
      })
      .catch(e => console.error(e));
  }

  alreadyStoredAlert() {
    const alert = this.alertCtrl.create({
      title: 'Heads up!',
      subTitle: `This pothole has already been registered.` +
  `Thank you for letting us know it's still a problem!`,
      buttons: ['OK'],
    });
    alert.present();
  }

  successfullyStoredAlert() {
    const alert = this.alertCtrl.create({
      title: 'Saved!',
      subTitle: 'Thanks for helping us make our city a more beautiful place!',
      buttons: ['OK'],
    });
    alert.present();
  }

  addPothole() {
    this.requestService.getPotholeByLocation(this.lat, this.lng)
      .then((data) => {
        if (data.length === 0) {
          this.requestService.createPothole({
            name: this.name,
            lat: this.lat,
            lng: this.lng,
          })
          .then((hole) => {
            this.nativeStorage.getItem('user')
              .then((user) => {
                this.requestService.createImpact({
                  force: [1],
                  users_id: user.id,
                  pothole_id: hole.id,
                }).then(impact => console.log('impact created', impact));
              });
          });
        } else {
          this.alreadyStoredAlert();
          this.nativeStorage.getItem('user')
            .then((user) => {
              this.requestService.createImpact({
                force: [1],
                users_id: user.id,
                pothole_id: data[0].id,
              }).then(impact => console.log(impact, 'impact saved'));
            });
        }
      });
  }
}
