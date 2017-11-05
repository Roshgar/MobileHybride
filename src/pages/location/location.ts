import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import { Geolocation } from '@ionic-native/geolocation';
import {LogInProvider} from '../../providers/log-in/log-in';
declare var google;

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('locationMap') mapElement: ElementRef;
    private _location : any;
    _map: any;

  constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, private _dataProvider: DataProvider, private _logInProvider: LogInProvider) {
    this._location = navParams.get("location");

  }

  public loadMap(){
    console.log('entry of loadmap')
    var pos = this._location.pos;
    var latLng = new google.maps.LatLng(pos.lat, pos.long);

    var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this._map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.loadMap();
  }

  public addUserToIncoming() {
    this._dataProvider.addUserToLocation(this._logInProvider.getCurrentUserId(), this._location.arName);
  }

  public removeUserFromIncoming() {
    this._dataProvider.removeUserFromLocation(this._logInProvider.getCurrentUserId(), this._location.arName, this._location.creator);
  }

  public showUsers() {
    console.log('in show users')
    this._dataProvider.getDirectionList(this._location.arName, {lat: this._location.pos.lat, lng: this._location.pos.long}, this._map);
  }
}
