import { OrderDetailPage } from './../order-detail/order-detail';
import { ApplicationService } from './../../providers/app-service/app-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrdersListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders-list',
  templateUrl: 'orders-list.html',
  
})
export class OrdersListPage {
  orders = [];
  ordersList: any;
  orderAddress: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appy: ApplicationService) {
  	this.getOrderList();
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad OrdersListPage');
    this.getOrderList();
  }


  getOrderList(){
  	this.appy.getOrders().then((data)=>{
      console.log(data);
      this.ordersList = data;
      this.ordersList = this.ordersList.filter(x => x.has_user_confirmed);
      console.log(this.ordersList);
      
  	})
  	 .catch((err)=>{
          console.log(err);
      });
  }
  getAddress(order){
    var addresses = order.user.addresses;
    var order_address_id = order.order.order_address.address_id;
    var address;
    addresses.map(function(x){
      if(x.id == order_address_id){
        address =  x.full_address;
      }
    })
    return address;
  }
  getTotal(order){
    var total = 0;
    order.order_items.map(function(x){
      total += x.total;
    })
    return total;
  }

  getStatusClass(order){
    var status = order.status;
    switch(status){
      case "order_sent":
        return "order-sent";
      case "accepted":
        return "accepted";
      case "in_kitchen":
        return "in-kitchen";
      case "on_the_way":
        return "on-the-way";
    }
  }

  toOrderDetail(order){
    this.navCtrl.push(OrderDetailPage,{ order_restaurant: order});
  }
}
