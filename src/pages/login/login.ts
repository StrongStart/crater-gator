import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userProfile: any = null;
  constructor(public navCtrl: NavController, private fb: Facebook) {
  }
  facebookLogin(): void {
    this.fb.login(['email'])
      .then((res) => {
        this.userProfile = `Logged into Facebook! ${res}`
        //get jwt
        //post to users
        //redirect to dashboard
      })
      .catch(e => this.userProfile = `Error logging into Facebook ${e}`);

  }


}
