import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Http } from '@angular/http';
import { Homepage} from '../homepage/homepage';
import { RequestService } from '../../app/request.service';

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
    private requestService: RequestService
  ){ }
  facebookLogin(): void {
    this.fb.login(['public_profile', 'email'])
      .then((response) => {
        console.log('line 28', response)
        this.requestService.getUser(response.authResponse.accessToken)
        .then(data => {
          console.log('line 30', data);
          if(!data) {
            this.saveUser(response);
          }
          this.redirectToDash();
        })
        .catch(e => console.log(e));
      })
      .catch(e => this.user = `Error logging into Facebook ${e}`);

  }
  saveUser(res: any) {
    this.user = res.authResponse;
    this.token = this.user.accessToken;
    console.log(res);
    return this.http.get(this.url + this.token)
    .toPromise()
    .then(response => {
      this.requestService.createUser({
        token: this.token,
        name: response.json().name
      })
        .then(data => console.log(data))
        .catch(e => console.error(e));
    })
    .catch(e => console.log(e));

  }

  redirectToDash(): void {
    this.navCtrl.setRoot(Homepage);
  }
}
