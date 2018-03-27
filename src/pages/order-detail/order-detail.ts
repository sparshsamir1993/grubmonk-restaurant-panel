import { ApplicationService } from './../../providers/app-service/app-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  orderRestaurant;
  orderItems;
  total;
  order_sent;
  accepted;
  in_kitchen;
  on_the_way;
  checkedIdx=-1;

  options = [
    'Order Received',
    'Accept Order',
    'Order In Kitchen',
    'Order On Its Way'
    ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService) {
  }

  ionViewWillEnter() {
    this.getOrderRestaurant();
    console.log('ionViewDidLoad OrderDetailPage');
  }
  getOrderRestaurant(){
    this.orderRestaurant = this.navParams.get('order_restaurant')
    this.orderItems = this.orderRestaurant.order_items;
    console.log(this.orderItems);
    this.getTotal(this.orderItems);
    var status = this.orderRestaurant['status'];
    var currIdx;
    var order_restaurant_id = this.orderRestaurant.id;
    switch(status){
      case "order_sent":
        currIdx= 0;
        break;
      case "accepted":
        currIdx= 1;
        break;
      case "in_kitchen":
        currIdx= 2;
        break;
      case "on_the_way":
        currIdx= 3;
        break;
    }
    this.checkedIdx = currIdx;

  }

  getTotal(order_items){
    var total = 0;
    order_items.map(function(x){
      total += x.total;
    })
    this.total = total;

  }

  updateStatus(status, e){
    console.log(status);
    console.log(e);
    var currStatus;
    var order_restaurant_id = this.orderRestaurant.id;
    switch(status){
      case "Order Received":
        currStatus= "order_sent";
        break;
      case "Accept Order":
        currStatus= "accepted";
        break;
      case "Order In Kitchen":
        currStatus= "in_kitchen";
        break;
      case "Order On Its Way":
        currStatus= "on_the_way";
        break;
    }

    this.appy.updateStatus(order_restaurant_id, currStatus).then((data)=>{
      this.orderRestaurant = data;
    },(err)=>{

    })

  }

  statusDone(){

  }

  logRestaurantGoingBack(orderRestaurant){

    var restaurant = orderRestaurant.restaurant.name;
    var orderNumber = orderRestaurant.order_id;
    console.log(restaurant+" restaurant just clicked the back status for order "+orderNumber);
    console.log(orderRestaurant);
  }



}
