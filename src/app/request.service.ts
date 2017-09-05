import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export class Pothole {
  name: string
  lat: number
  lng: number
}
export class Impact {
  date: Date
  force: Number
  pothole_id: Number
}
@Injectable()
export class RequestService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'http://54.163.239.254:3000/'
  constructor(private http: Http) { }

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
  getImpacts() {
    return this.http.get('http://54.163.239.254:3000/impact')
      .toPromise()
      .then(response => response.json().data as Impact[])
      .catch(this.handleError)
  }
  getPotholes() {
    return this.http.get('http://54.163.239.254:3000/pothole')
      .toPromise()
      .then(response => response.json().data as Pothole[])
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}