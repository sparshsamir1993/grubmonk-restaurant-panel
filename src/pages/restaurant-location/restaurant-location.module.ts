import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantLocationPage } from './restaurant-location';

@NgModule({
  declarations: [
    RestaurantLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantLocationPage),
  ],
})
export class RestaurantLocationPageModule {}
