import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
  // CameraPosition, MarkerOptions,   Marker
 } from '@ionic-native/google-maps';
import { Component } from "@angular/core/";
import { Geolocation } from '@ionic-native/geolocation';
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
  speed: Number
  trackerStarted:Boolean = false

  constructor(private googleMaps: GoogleMaps, public platform: Platform,
  private requestService:RequestService, private geolocation: Geolocation,
  public events:Events
) { events.subscribe('menu:opened', () => this.map.setClickable(false))
    events.subscribe('menu:closed', () => this.map.setClickable(true))
  }
  ionViewDidEnter(){
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }
  loadMap() {
    this.mapLoaded = true;
      this.mapElement = document.getElementById('map');
      let mapOptions: GoogleMapOptions = {
        controls: {myLocationButton: true},
        camera: {
          target: {lat: 29.988700, lng: -90.046367 }, zoom: 11, tilt: 30
        }
      };
    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
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
        let watch = this.geolocation.watchPosition({
          enableHighAccuracy: true
        })
        watch.subscribe((data) => {
          !this.trackerStarted ? this.tracker(data, values) : 1
          this.trackerStarted = true
          this.speed = data.coords.speed
        })
      })
    })
  }
  tracker(loc, holes) {
    let dist = 1.5
    let {latitude, longitude} = loc.coords //user location
    const lessThan2Minutes = holes.reduce((acc, cur) => {
      let d = this.getDistanceFromLatLonInMi(latitude, longitude,
        cur.lat, cur.lng)
        console.log(d, cur.name)
        return (d < dist ? acc.concat(cur) : acc);
    }, [])
    console.log(lessThan2Minutes)

  }
  // Credit: http://stackoverflow.com/a/27943/52160
  getDistanceFromLatLonInMi(lat1,lon1,lat2,lon2) {
    const deg2rad = (deg) => deg * (Math.PI/180)
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d / 1.609
    }

}







