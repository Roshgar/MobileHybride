import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data'
import {LogInProvider} from '../../providers/log-in/log-in'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  _user : any;
  public userForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _dataProvider: DataProvider, private _logInProvider: LogInProvider, public formBuilder: FormBuilder) {

                this._user = this.navParams.get("user");

                console.log("constructor")
                console.log(this._user);

                //console.log(this.navParams.get("user"));

  }


  ionViewWillEnter() {
    this.userForm = this.formBuilder.group({
      level: [''],
      userName: ['']});

  }

  ionViewDidLoad() {
    //var user = this._dataProvider.getUser(this._logInProvider.getCurrentUserId());
    console.log('ionViewDidLoad UserPage');
    console.log(this._user);
  }

  public updateUser() {
    var userName = this.userForm.value.userName;
    var level = this.userForm.value.level;

    if (level) {
      this._dataProvider.updateLevel(this._logInProvider.getCurrentUserId(), level);
    }
    //
    if (userName) {
      this._dataProvider.updateUserName(this._logInProvider.getCurrentUserId(), userName);
    }
    alert("updated");
    //this._dataProvider.updateUserName();
  //  this.navCtrl.pop(UserPage);
  }

  public logOut() {
    this._logInProvider.logoutUser();
  }

}
