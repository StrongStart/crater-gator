import { Component } from '@angular/core';
import { IonicPage, /*NavController,  NavParams,*/ Platform } from 'ionic-angular';
import { DeviceMotion } from '@ionic-native/device-motion';
import { RequestService } from '../../app/request.service'
import { SmartAudio } from '../../providers/smart-audio/smart-audio'
import { TextToSpeech } from '@ionic-native/text-to-speech';

@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html'
})
export class Homepage {
  private moveCounter:number = 0;
  accels: Array<number>
  limit:number= 3
  joltSize:number = 10;
  trigger:String = 'none'
  coord: Array<number> = [0, 0, 0]
  total: number = 0
  holes: any = [1,1,1]

  constructor(
  private tts: TextToSpeech,
  platform:Platform,
  private deviceMotion:DeviceMotion,
  private requestService: RequestService,
  public smartAudio:SmartAudio) {
    this.getPotholes()
    platform.ready().then(() => {
      smartAudio.preload('sound', 'assets/sounds/beep15.mp3')
      if (platform.is('cordova') === true) {
        this.check()
      }
    })
  }
  count = 0
  saveImpact(force:number) {
    // this.smartAudio.play('sound');
    let rounded = Math.floor(force)
    console.log(rounded, 'is rounded')
    this.tts.speak(`That impact was ${rounded} gees`)
    
    console.log('played')
    let lat = 29.927594 + Math.random() * .08865
    let long = -90.132690 + Math.random() * .196903
    this.requestService.createPothole({
      name: this.name(),
      lat: lat,
      lng: long})
      .then(hole => {
        this.requestService.createImpact({
          force: force,
          users_id: 1,
          pothole_id: hole.id
        }).then(impact => console.log(impact))
    })
  }
  saveTrigger() {
    this.count++
    this.trigger = this.count.toString();
    let lat = 29.927594 + Math.random() * .08865
    let long = -90.132690 + Math.random() * .196903
    this.requestService.createPothole({
      name: this.name(),
      lat: lat,
      lng: long})
      .then(hole => console.log(hole))
    }
    getPotholes(): void {
      this.requestService.getPotholes()
      .then(values => this.holes = values)
    }
    name() {
      let first = ['cavern', 'pit', 'hole', 'jaws', 'crater', 'pit',
      'rut', 'bump', 'dent']
      let second = ['despair', 'lost cars', 'infinite depth',
      'Moria', 'tremendous damage', 'get your checkbook out',
      'desperation', 'disheartenment', 'dashed hopes']
      const random = () => Math.floor(Math.random() * first.length)
      return first[random()] + ' of ' + second[random()]
    }
    check = () => {
      let lastX, lastY, lastZ
      this.deviceMotion.watchAcceleration({frequency:200})
        .subscribe(acc => {
          if(!lastX) {
            lastX = acc.x;
            lastY = acc.y;
            lastZ = acc.z;
            return;
          }
          let deltaX, deltaY, deltaZ
          deltaX = Math.abs(acc.x-lastX);
          deltaY = Math.abs(acc.y-lastY);
          deltaZ = Math.abs(acc.z-lastZ);
          if(deltaX + deltaY + deltaZ > this.joltSize) {
            console.log(this.total)
            this.moveCounter++;
          } else {
            this.moveCounter = Math.max(0, --this.moveCounter);
          }
          if(this.moveCounter > this.limit) {
            this.total = deltaX + deltaY + deltaZ
            this.saveImpact(this.total)
            this.moveCounter=0;
          }
          lastX = acc.x;
          lastY = acc.y;
          lastZ = acc.z;
      });
    }
  }