import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { LogInPage } from '../pages/log-in/log-in'
import { HomePage } from '../pages/home/home';
import { LogInProvider } from '../providers/log-in/log-in';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LogInPage;
  @ViewChild('myNav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _loginProvider : LogInProvider
  ) {


    var self = this;
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        console.log('redirect to login')
        self.rootPage = LogInPage;
        self._loginProvider.setIsLogged(false)
        self.nav.setRoot(LogInPage);
        //unsubscribe();
      } else {
        console.log('redirect to home');
        self.rootPage = HomePage;
        self._loginProvider.setIsLogged(true);
        self.nav.setRoot(LogInPage);
        //unsubscribe();
      }
    });
    platform.ready().then(() => {
      if (this._loginProvider.isLogged()) {
        this.rootPage = HomePage;
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if (this._loginProvider.isLogged()) {
      this.rootPage = HomePage;
    }
  }
}
