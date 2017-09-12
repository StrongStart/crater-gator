import { Component } from '@angular/core';

import { NavController, NavParams, Platform } from 'ionic-angular';
import { RequestService } from '../../app/request.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  platform:Platform
  coord:Array<number> = [0, 0]
  progress:String = '';
  impacts: Array<object>
  holes: Array<object>
  name: string
  num: string
  street: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform:Platform,
    public requestService: RequestService,
    private socialSharing: SocialSharing,
    private nativeGeocoder: NativeGeocoder
  ) {
    requestService.getImpacts()
      .then(hits => {
        this.impacts = hits.slice(0, 25).map(e => {
          e.date = e.date.slice(5, 7) + '-'+ e.date.slice(8, 10) + '-'+
          e.date.slice(0,4)
          e.force = e.force.reduce((a, c) => a + (c/9.8).toString().slice(0,3)+',', '')
          console.log(e.force)
          return e
        })
      })
  }

  sendMessage(i: any) {
    let message = `I hit the ${this.name} on ${i.date} at ${this.num} ${this.street}. It had a force of ${i.force} g's! @MayorLandrieu`
      this.socialSharing.share(message, null, null)
  }

  postToFb(impact: any): any {
    this.requestService.getPotholeById(impact.pothole_id)
      .then(pothole => {
        this.name = pothole.name;
        this.nativeGeocoder.reverseGeocode(pothole.lat, pothole.lng)
        .then(address => {
          this.num = address.subThoroughfare
          this.street = address.thoroughfare
          this.sendMessage(impact)
        })
      })
      .catch(e => console.log(e));
  }

}