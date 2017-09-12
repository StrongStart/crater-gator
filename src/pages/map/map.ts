import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
  // CameraPosition, MarkerOptions,   Marker
 } from '@ionic-native/google-maps';
import { Component } from "@angular/core/";
import { Platform } from 'ionic-angular';
import { RequestService } from '../../app/request.service'
import { Events } from 'ionic-angular';


@Component({
  selector: 'Map-page',
  templateUrl: 'map.html'
})
export class MapPage {
  map: GoogleMap;
  holes: any = [1,1,1]
  mapElement: HTMLElement;
  mapLoaded:Boolean = false

  constructor(private googleMaps: GoogleMaps, public platform: Platform,
  private requestService:RequestService, public events:Events
) { events.subscribe('menu:opened', () => this.map.setClickable(false))
    events.subscribe('menu:closed', () => this.map.setClickable(true))
  }
  ionViewDidEnter(){
    this.platform.ready().then(() => this.loadMap());
  }
  loadMap() {
    this.mapLoaded = true;
      this.mapElement = document.getElementById('map');
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {lat: 29.988700, lng: -90.046367 }, zoom: 11, tilt: 30
        }
      }
    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.set('backgroundColor', 'pink');
      this.requestService.getPotholes().then(values => {
        values.forEach(ph => {
          this.map.addMarker({
            title: ph.name,
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: ph.lat,
              lng: ph.lng
            }
          })
        });
      })
    })
  }
}







