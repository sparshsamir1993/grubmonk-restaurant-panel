import { RestaurantLocationPage } from './../pages/restaurant-location/restaurant-location';
import { OrderDetailPage } from './../pages/order-detail/order-detail';
import { OrdersListPage } from './../pages/orders-list/orders-list';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { LoginPage } from './../pages/login/login';
import { ApplicationService } from './../providers/app-service/app-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthService } from '../providers/auth-service/auth-service';
import { IonicStorageModule } from '@ionic/storage';
import {CommonModule} from '@angular/common';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    OrdersListPage,
    LoginPage,
    OrderDetailPage,
    RestaurantLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    OrdersListPage,
    LoginPage,
    OrderDetailPage,
    RestaurantLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ApplicationService,
    Facebook,
    Geolocation
  ]
})
export class AppModule {}
