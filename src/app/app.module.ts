import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';
import { LogInProvider } from '../providers/log-in/log-in';
import { LogInPage } from '../pages/log-in/log-in';
import {SignUpPage} from '../pages/sign-up/sign-up';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {AddMarkerPage } from '../pages/add-marker/add-marker';
import {LocationsPage } from '../pages/locations/locations';
import {LocationPage} from '../pages/location/location';
import {UserPage } from '../pages/user/user';

import * as firebase from 'firebase';
import { DirectionsProvider } from '../providers/directions/directions';

 export const config = {
  apiKey: "AIzaSyD0A1FFMwVgyao3FqY8s4dX3vBM83JL9w4",
  authDomain: "hybridmobile-9aec0.firebaseapp.com",
  databaseURL: "https://hybridmobile-9aec0.firebaseio.com",
  projectId: "hybridmobile-9aec0",
  storageBucket: "hybridmobile-9aec0.appspot.com",
  messagingSenderId: "81894382554"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LogInPage,
    SignUpPage,
    ResetPasswordPage,
    AddMarkerPage,
    LocationsPage,
    LocationPage,
    UserPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LogInPage,
    SignUpPage,
    ResetPasswordPage,
    AddMarkerPage,
    LocationsPage,
    LocationPage,
    UserPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    LogInProvider,
    DirectionsProvider,
  ]
})
export class AppModule {}
