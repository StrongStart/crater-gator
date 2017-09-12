import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { DashPage} from '../dash/dash';
import { RequestService } from '../../app/request.service';

import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = null;
  token: string = null;
  url: string ='https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token='
  constructor(
    private http: Http,
    public navCtrl: NavController,
    private fb: Facebook,
    private requestService: RequestService,
    private nativeStorage: NativeStorage
  ){
    //check native storage for JWT
    this.nativeStorage.getItem('user')
      .then(data => {
        if (data) {
          console.log(data);
          //if validated
            //get username
            this.redirectToDash();
        }
      })
      .catch(error => console.error(error));
  }
  facebookLogin(): void {
    this.fb.login(['public_profile', 'email'])
      .then((response) => {
        this.token = response.authResponse.accessToken;
        return this.http.get(this.url + this.token)
          .toPromise()
          .then(fbResponse => {
            if (fbResponse.ok) {
              this.saveUser(fbResponse)
            }
          })
      })
      .catch(e => this.user = `Error logging into Facebook ${e}`);

  }
  saveUser(res: any) {
      this.requestService.createUser({
        token: this.token,
        name: res.json().name
      })
      .then(data => {
        this.nativeStorage.setItem('user', { id: data.id, name: data.name, token: data.token })
        this.redirectToDash();
      })
      .catch(e => console.error(e));
  }

  redirectToDash(): void {
    this.navCtrl.setRoot(DashPage);
  }
}
