import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from './../home/home';
import { OrdersListPage } from './../orders-list/orders-list';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component , ViewChild} from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Nav,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})

export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';
  accestoken:any;

  constructor(public navCtrl: NavController, public auth: AuthService, public alertCtrl: AlertController, public loadingCtrl:LoadingController, public storage: Storage, public fb: Facebook) {
      console.log(window.localStorage.getItem('token'));
  }

  ionViewDidLoad() {
      if(this.auth.isLoggedin){
          console.log('he is bro');
      }

    console.log('Hello LoginPage Page');
  }

  /*
  for both of these, if the right form is showing, process the form,
  otherwise show it
  */
  doLogin() {
    if(this.showLogin) {
      console.log('process login');
      var user = JSON.parse(window.localStorage.getItem('user'));
      if(user){
        this.email  = user.email;
      }
      if(this.email === '' && this.password === '') {
            let alert = this.alertCtrl.create({
              title:'Register Error',
              subTitle:'All fields are rquired',
              buttons:['OK']
            });
            alert.present();
            return;
          }

          let loader = this.loadingCtrl.create({
            content: "Logging in..."
          });
          loader.present();

          this.auth.authenticate({'email':this.email, 'password':this.password}).then((data) => {
            this.auth.loadUserCredentials();
            console.log(data);
            console.log('ok i guess?');
            loader.dismissAll();
            this.navCtrl.setRoot(OrdersListPage);
          }, (err) => {
                loader.dismissAll();
                console.log(err.message);

                let errors = '';
                if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
                if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

                let alert = this.alertCtrl.create({
                      title:'Login Error',
                      subTitle:errors,
                      buttons:['OK']
                });
                alert.present();
          });
    }
    else {
      this.showLogin = true;
    }
  }

  doRegister() {
    if(!this.showLogin) {
      console.log('process register');

      /*
      do our own initial validation
      */
     var user = JSON.parse(window.localStorage.getItem('user'));
     if(user){
       this.email  = user.email;
     }

      if(this.name === '' && this.email === '' && this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Register Error',
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let details = {'email':this.email, 'password':this.password, 'name':this.name};
      console.log(details);

      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();

      this.auth.addUser(details).then(() => {
        console.log('ok signup');
        this.auth.authenticate({'email':details.email, 'password':details.password}).then(() => {
          loader.dismissAll();
          this.navCtrl.setRoot(HomePage);
        });

      }, (err) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') errors += 'Email is required.<br/>';
          if(e === 'required_password') errors += 'Password is required.<br/>';
          if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
        let alert = this.alertCtrl.create({
          title:'Register Error',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });

    } else {
      this.showLogin = false;
    }
  }

  fbLogin(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res)
      this.accestoken = res['authResponse']['accessToken'];
      this.email = res['authResponse']['email'];
      this.auth.fbchecktoken(this.accestoken).then((data)=>{
        console.log(data);
        // this.auth.validateFBtoken(this.accestoken, data['uid'], data['client']).then((data)=>{
        //   console.log(data);
        // },(err)=>{

        // })
        // window.localStorage.setItem('access-token',this.accestoken);
        this.auth.loadUserCredentials();
        this.navCtrl.setRoot(HomePage);
      },(err)=>{
        console.log(err);
      });
    }
    )
    .catch(e => console.log('Error logging into Facebook', e));
    
  }

}
