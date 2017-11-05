import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {DataProvider} from '../../providers/data/data'
import {LogInProvider} from '../../providers/log-in/log-in'
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
import * as firebase from 'firebase';

/**
 * Generated class for the AddMarkerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-marker',
  templateUrl: 'add-marker.html',
})
export class AddMarkerPage {
  public addMarkerForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public _dataProvider: DataProvider,
              public geolocation : Geolocation, public _logInProvider: LogInProvider) {

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AddMarkerPage');
  }

  ionViewWillEnter() {
    this.addMarkerForm = this.formBuilder.group({arName: ['', Validators.required],
                                        pName: ['',Validators.required],
                                        desc: [''],
                                        timer: ['',Validators.required],
                                      });
  }


  public addMarker() {
    if (this.addMarkerForm.valid){
      var self = this;
      this._dataProvider.getUser(this._logInProvider.getCurrentUserId()).then(function (user) {
        let latLng = new google.maps.LatLng(user.pos.lat, user.pos.lon);
        self._dataProvider.addLocation({arName : self.addMarkerForm.value.arName,
                                        pName : self.addMarkerForm.value.pName,
                                        desc : self.addMarkerForm.value.desc,
                                        timer : self.addMarkerForm.value.timer,
                                        currTime :  0,
                                        pos : { lat : latLng.lat(),
                                                long : latLng.lng()
                                          },// figure out time
                                        creator : self._logInProvider.getCurrentUserId(),
                                        users : [
                                          self._logInProvider.getCurrentUserId()
                                        ]});

      });
/*
      this.geolocation.getCurrentPosition().then((position) => {
        console.log("In currPosition")
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(this.addMarkerForm.value);
        self._dataProvider.addLocation({arName : self.addMarkerForm.value.arName,
                                        pName : this.addMarkerForm.value.pName,
                                        desc : this.addMarkerForm.value.desc,
                                        timer : this.addMarkerForm.value.timer,
                                        currTime :  0,
                                        pos : { lat : latLng.lat(),
                                                long : latLng.lng()
                                          },// figure out time
                                        creator : self._logInProvider.getCurrentUserId(),
                                        users : [
                                          self._logInProvider.getCurrentUserId()
                                        ]});
      }, (err) => {
        console.log('error during map load')
        console.log(err);
      });

*/
  this.navCtrl.pop(AddMarkerPage);
    }
  }
}


/*
rror: Uncaught (in promise): Error: formGroup expects a FormGroup instance. Please pass one in.

       Example:


    <div [formGroup]="myGroup">
      <input formControlName="firstName">
    </div>

    In your class:

    this.myGroup = new FormGroup({
       firstName: new FormControl()
    });
Error: formGroup expects a FormGroup instance. Please pass one in.

       Example:


    <div [formGroup]="myGroup">
      <input formControlName="firstName">
    </div>

    In your class:

    this.myGroup = new FormGroup({
       firstName: new FormControl()
    });
*/



/*      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

      let content = "<h4>Information!</h4>";

      this.addInfoWindow(marker, content);*/
