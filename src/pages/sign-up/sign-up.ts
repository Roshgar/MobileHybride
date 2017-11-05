import { Component } from '@angular/core';
import { IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInProvider } from '../../providers/log-in/log-in';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';

@IonicPage({
  name: 'sign-up'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public signupForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController,
    public authProvider: LogInProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
      this.signupForm = formBuilder.group({
        email: ['',
          Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['',
          Validators.compose([Validators.minLength(6), Validators.required])],
        userName: ['',
            Validators.compose([Validators.required])],
      });
    }
    signupUser(){
  if (!this.signupForm.valid){
    console.log(this.signupForm.value);
  } else {
    this.authProvider.signupUser(this.signupForm.value.email,
      this.signupForm.value.password, this.signupForm.value.userName)
    .then(() => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);
      });
    }, (error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
}
