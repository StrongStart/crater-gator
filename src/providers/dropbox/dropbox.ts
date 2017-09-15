import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Dropbox {
  accessToken: string = process.env.DROPBOX_TOKEN;

  constructor(public http: Http) { }

  savePhoto(photo: any) {
    console.log('saving', photo);
    this.http.post('https://content.dropboxapi.com/1/files_put/auto/', 'options')
      .toPromise()
      .then(res => console.log(res))
      .catch(e => console.error(e));
  }

  getPhotos() {
    console.log('getting photos');
  }

}
