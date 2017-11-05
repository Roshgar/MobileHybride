import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, AlertController } from 'ionic-angular';
import { LogInProvider } from '../../providers/log-in/log-in'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomePage } from '../../pages/home/home'
import { EmailValidator } from '../../validators/email';
import {SignUpPage} from '../sign-up/sign-up'
import {ResetPasswordPage} from '../reset-password/reset-password'
/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})

export class LogInPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, public authProvider: LogInProvider, public formBuilder: FormBuilder) {
              this.loginForm = formBuilder.group({email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                                                  password: ['', Validators.compose([Validators.minLength(6), Validators.required])]});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }
  goToSignup(): void {
  this.navCtrl.push(SignUpPage);
}

goToResetPassword(): void {
  this.navCtrl.push(ResetPasswordPage);
}
  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    }
    else {
      this.authProvider.logInUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{
                text: "Ok",
                role: 'cancel'
              }]});
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }


}
