import { Component } from '@angular/core';

import { NavController, NavParams, Platform } from 'ionic-angular';
import { RequestService } from '../../app/request.service'

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform:Platform,
    requestService: RequestService,
  ) {
    requestService.getPotholes()
    .then(values => {
      this.holes = values
    })

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
}