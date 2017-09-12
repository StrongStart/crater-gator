import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-dash',
  templateUrl: 'dash.html',
})
export class DashPage {
  user: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('user')
      .then(user => {
        this.user = user.name;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashPage');
  }

}
