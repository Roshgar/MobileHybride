import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data'
import {LocationPage} from '../../pages/location/location'

/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  private _locations: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _dataProvider: DataProvider) {
    this._locations = navParams.get("locations");
  }

  ionViewWillEnter() {

  }

  public goToLocation(loc) {
    this.navCtrl.push(LocationPage, {location: loc});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
    console.log(this._locations);
  }

}
