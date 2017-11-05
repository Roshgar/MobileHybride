import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
declare var google;

/*
  Generated class for the DirectionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DirectionsProvider {
  private _directionsService;

  constructor(public http: Http) {
    this._directionsService = new google.maps.DirectionsService();
    console.log('Hello DirectionsProvider Provider');
  }

  public addTrajectory(route, map) {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    this._directionsService.route(route, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
  }

}
