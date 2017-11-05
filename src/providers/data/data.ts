import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

import {DirectionsProvider} from '../directions/directions'

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  private _db: any;
  private _locations: any;
  private _users: any;

  constructor(public http: Http, private _directionsProvider: DirectionsProvider) {
    console.log('Hello DataProvider Provider');
    this._db = firebase.database().ref('/'); // Get a firebase reference to the root
    this._locations = firebase.database().ref('/locations');
    this._users = firebase.database().ref('/users');
  }

  public getLocations() {
    var ret = [];
    var locations = new Array;


    return (this._locations.once("value").then(function(snapshot) {
      console.log('getLocations')
      var tmp = snapshot.val();
      for (var key in tmp) {
        locations.push(tmp[key]);
      }
      console.log(locations);
      ret = locations;
      return (locations);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      return (null);
    }));
  }

  public printDataTest() {
/*
    this._db.on('value', function (snapshot) {
      console.log('in value thing : ');
      console.log(snapshot.val());
    });
*/
  }

  public addUserToLocation(user : string, locationName : string) {
    var users = this._locations.child(locationName).child('users');
    users.once('value').then(function (snapshot) {
      var updated = snapshot.val();
      if (updated.indexOf(user) == -1) {
        updated.push(user);
        console.log('in addUserToLocation');
        console.log(snapshot.val());
         users.set(updated);
         alert("You are going to location");
      }
      else
        alert("You are already registered to this location.");

    });


  }

  public removeUserFromLocation(user : string, locationName : string, creator : string) {
    if (user != creator) {
      var users = this._locations.child(locationName).child('users');
      users.once('value').then(function (snapshot) {
        var updated = snapshot.val();
        var toRemove = updated.indexOf(user);
        if (toRemove > -1) {
          updated.splice(toRemove, 1)
          alert("You are not going to location anymore");
        }
        else
          alert("You are not registered for that location.");
        if (updated)
          users.set(updated);
        else
          users.set([]);
      });
    }
    else
      alert("The creator of a location can not remove himself.")

  }



  public addLocation(locObject) {
    console.log(locObject)
    firebase.database().ref('/locations').child(locObject.arName).set(locObject);
  }
/*
  this.getUsers = function() {
      var ref = firebase.database().ref('/users/');
      return ref.once('value').then(function(snapshot) {
          users = snapshot.val();
          for(var key in users) {
              users[key].id = key;
              // do some other stuff
          }
          return(users);
      }).catch(function(error){
          alert('error:  ' + error);
      });
  }
*/

  public updatePosition(userId, newPos) {
    var pos = this._users.child(userId).child('pos');
    pos.once('value').then(function (snapshot) {
      pos.set(newPos);
    });
  }

  public getUserIds(locationName) {
    var userIds = [];
    var locationUsers = this._locations.child(locationName).child('users');
    return locationUsers.once('value').then(function (snapshot) {
      var uIds = snapshot.val();
      for (var i in uIds) {
        console.log(uIds[i]);
        userIds.push(uIds[i]);
      }
      console.log("before return")
      return (userIds);
    }, function (errorObject) {
      console.log("Error in getUserPositions" + errorObject.code);
    }).catch(function(error){
        alert('error:  ' + error);
    });
  }
/*
  public getUserPositions(locationName) {
    var tmp;
    var positions = [];
    var locationUsers = this._locations.child(locationName).child('users');
    var self = this;
    debugger;
    return  locationUsers.once('value').then(function (snapshot) {
      debugger;
      var uIds = snapshot.val();
      for (var i in uIds) {
        debugger;
        console.log(uIds[i]);
        self.getUser(uIds[i]).then(function(user) {
          debugger;
          positions.push({pos: user.pos, name: user.userName});
          console.log("in loop + " + user.pos.lon +  "/" + user.pos.lat);
          console.log(positions);
        });
      }
      console.log("before return")
      debugger;
      return (positions);
    }, function (errorObject) {
      console.log("Error in getUserPositions" + errorObject.code);
    }).catch(function(error){
        alert('error:  ' + error);
    });
  }
*/
  public getUser(userId) {
    var user = this._users.child(userId);
    var ret = {};
    return user.once('value').then(function (snapshot) {
      ret = snapshot.val();
      console.log('in once getUser')
      console.log(ret);
      return (ret);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }).catch(function(error){
        alert('error:  ' + error);
    });

  }

  public getUsers() {
    var ret = {};
    var users = [];
    return this._users.once('value').then(function (snapshot) {
      ret = snapshot.val();
      for (var key in ret) {
        users.push({user: ret[key], uid: key});
      }
      console.log('in once getUsers')
      console.log(users);
      return (users);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }).catch(function(error){
        alert('error:  ' + error);
    });

  }


  private findUser(uid, userList) {
    for (var i in userList) {
      if (userList[i].uid == uid)
        return (i);
    }
    return (-1);
  }

  public getDirectionList(locationName, locationPos, map) {
    //this.getUserIds(locationName);
    var self = this;
    var userCoords = [];
    var tmp;
    this.getUserIds(locationName).then(function (ids) {
      self.getUsers().then(function(users) {
        for (var user in ids) {
          console.log(ids[user]);
          if ((tmp = self.findUser(ids[user], users)) > -1) {
            console.log("in if : "+ tmp);
            userCoords.push({user: users[tmp], destRequest: {
              origin: {lat: users[tmp].user.pos.lat, lng: users[tmp].user.pos.lon},
              destination : {lat: locationPos.lat, lng: locationPos.lng},
              travelMode: 'WALKING'
            }});
          }
        }
        for (var i in userCoords) {
          self._directionsProvider.addTrajectory((userCoords[i]).destRequest, map);
        }
        console.log("in directionlist");
        console.log(users);
        console.log(userCoords);
        console.log(ids);
      });
    });
    console.log(userCoords);

    /*this.getUserPositions(locationName).then(function(positions) {
      debugger;
      console.log("in directionlist");
      console.log(positions);
    });*/
  }

  public updateLevel(userId, newLevel) {
    console.log("user = " + newLevel);
      var level = this._users.child(userId).child('level');
      level.once('value').then(function (snapshot) {
        level.set(newLevel);
      });
  }

  public updateUserName(userId, newUserName) {
    console.log("user = " + newUserName);
      var userName =  this._users.child(userId).child('userName');
      userName.once('value').then(function (snapshot) {
        userName.set(newUserName);
      });
  }
}


/*  users.once('value').then(function (snapshot) {
    var users = snapshot.val();
    var user;
    for (var key in users) {
      if ((snapshot.val())[key].email == userEmail) {
        user = key;
      }
    }
    //console.log(users[key]);
    console.log(userBis);
    //return (users[key]);
  });*/
