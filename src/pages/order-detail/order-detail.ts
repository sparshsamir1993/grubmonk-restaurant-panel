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
    'order_sent',
    'accepted',
    'in_kitchen',
    'on_its_way'
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
      case "order_sent":
        currStatus= "order_sent";
      case "accepted":
        currStatus= "accepted";
      case "in_kitchen":
        currStatus= "in_kitchen";
      case "on_the_way":
        currStatus= "on_the_way";
    }

    this.appy.updateStatus(order_restaurant_id, currStatus).then((data)=>{
      order_restaurant_id
    },(err)=>{

    })

  }

  statusDone(){

  }



}
