import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from '../../providers/data/data';
import {LogInProvider} from '../../providers/log-in/log-in'
import {LogInPage } from '../../pages/log-in/log-in';
import {AddMarkerPage } from '../../pages/add-marker/add-marker';
import {LocationsPage } from '../../pages/locations/locations';
import {UserPage } from '../../pages/user/user';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('map') mapElement: ElementRef;
//  @ViewChild('myNav') nav: NavController;
  map: any;
  isLoggedOn = false;
  testRoot = LogInPage;
  constructor(public geolocation: Geolocation,
              public _dataProvider : DataProvider, public _logInProvider : LogInProvider, public nav : NavController) {
                this.geolocation.watchPosition().subscribe((data) => {
                  if (data.coords) {
                    this._dataProvider.updatePosition(this._logInProvider.getCurrentUserId(), {lat: data.coords.latitude, lon: data.coords.longitude });
                  }
                  else {
                    console.log('An error occured in geolocation update.');
                  }
                });
  }

  /*

  */
  ionViewDidLoad(){
    console.log('In viewloaded');
    //this._dataProvider.printDataTest();
    this.loadMap();
}

ionViewWillEnter() {
  console.log('in enter')
}
  loadMap(){
    console.log('entry of loadmap');
    var self = this;
    this._dataProvider.getUser(this._logInProvider.getCurrentUserId()).then(function (user) {
      let latLng = new google.maps.LatLng(user.pos.lat, user.pos.lon);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
    });
  /*  this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log('error during map load')
      console.log(err);
    });*/
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  public centerMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.setCenter(latLng);
    }, (err) => {
      console.log('error during map load')
      console.log(err);
    });
  }

  public locations() {
    this.nav.push(LocationsPage, {locations : this._dataProvider.getLocations()});
  }

  public addMarker(){
    if (this._logInProvider.isLogged()) {
      this.nav.push(AddMarkerPage);

    }
    else
      alert("You must be logged on for this.")
 }

 public logIn(){

     this.nav.push(LogInPage);
}

  public userProfile() {
    var uid = this._logInProvider.getCurrentUserId();
    var self = this;
    this._dataProvider.getUser(uid).then(function(user) {
      console.log("in userProfile");
      console.log(user);
      self.nav.push(UserPage, {user: user});
    });


  }
}
