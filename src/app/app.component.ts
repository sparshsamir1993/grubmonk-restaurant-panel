import { RestaurantLocationPage } from './../pages/restaurant-location/restaurant-location';
import { OrdersListPage } from './../pages/orders-list/orders-list';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { Config, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Component, ViewChild } from '@angular/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  @ViewChild(Nav) nav: Nav;

  pages = [
    { title: 'Home', component: HomePage },
    { title : "Orders List", component: OrdersListPage},
    { title: "My location", component: RestaurantLocationPage}
  ];
  pagesNot = [
    { title: 'Login', component: LoginPage },
    { title: 'Home', component: HomePage }
  ];

  constructor(private platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    // this.initTranslate();
  }
  authenticated(){
    if(window.localStorage.getItem('user')){
        return true;
    }
    else{
        return false;
    }
}
  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // initTranslate() {
  //   // Set the default language for translation strings, and the current language.
  //   this.translate.setDefaultLang('en');

  //   if (this.translate.getBrowserLang() !== undefined) {
  //     this.translate.use(this.translate.getBrowserLang());
  //   } else {
  //     this.translate.use('en'); // Set your language here
  //   }

  //   this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
  //     this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
  //   });
  // }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
