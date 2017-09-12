import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';


import 'rxjs/add/operator/toPromise';

export class Pothole {
  name: string
  lat: number
  lng: number
}
export class Impact {
  date: Date
  force: Array<number>
  pothole_id: Number
  user_id: Number
}
@Injectable()
export class RequestService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://cratergator.club/'
  constructor(private http: Http, private nativeStorage: NativeStorage) { }

  // post requests
  createImpact(info: any): any {
    return this.http.post(`${this.url}impact`,
      JSON.stringify(info),
    {headers: this.headers}).toPromise()
    .then(res => res.json()).catch(this.handleError);
  }

  createPothole(info: any): any {
    return this.http.post(`${this.url}pothole`,
      JSON.stringify(info),
    {headers: this.headers}).toPromise()
    .then(res => res.json()).catch(this.handleError);
  }

  createUser(info: any): any {
    return this.http.post(`${this.url}users`,
    JSON.stringify(info),
    { headers: this.headers }).toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  //get all requests
  getImpacts() {
    return this.nativeStorage.getItem('user')
      .then(user => {
        return this.http.get(`${this.url}impact?users_id=${user.id}`)
          .toPromise()
          .then(response => response.json() as Impact[])
          .catch(this.handleError)
      })
  }
  getPotholes() {
    return this.http.get(`${this.url}pothole`)
      .toPromise()
      .then(response => response.json() as Pothole[])
      .catch(this.handleError)
  }

  //get one requests
  getUser(userToken: string): any {
    return this.http.get(`${this.url}users?token=${userToken}`)
      .toPromise()
      .then(res => {
        res.json()
      })
      .catch(this.handleError);
  }

  getPotholeByLocation(lat, lng) {
    return this.http.get(`${this.url}pothole?lat=${lat}&&lng=${lng}`)
      .toPromise()
      .then(res => res.json().data as Pothole)
      .catch(this.handleError);
  }

  getPotholeById(id: string) {
    return this.http.get(`${this.url}pothole?id=${id}`)
      .toPromise()
      .then(res => res.json()[0] as Pothole)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}