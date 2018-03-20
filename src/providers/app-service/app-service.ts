import { AuthService } from './../auth-service/auth-service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Application provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApplicationService {
    baseUrl;
    access_token;
    expiry;
    token_type;
    uid;
    client;
    orders;

  constructor(public http: Http, public storage: Storage, public auth: AuthService) {
      this.baseUrl = 'http://localhost:3000/api/v1/restaurant_interface';
      //this.baseUrl = 'https://grubvibes.herokuapp.com/api/vi';
    console.log('Hello Application Provider');
    this.setHeaders();
    

  }

  getHeaders(data){
      console.log('getting headers');
      if(data.headers.toJSON()['access-token'] != undefined){
          window.localStorage.setItem('access-token', data.headers.toJSON()['access-token'][0]);
          window.localStorage.setItem('expiry',data.headers.toJSON()['expiry'][0]);
          window.localStorage.setItem('client',data.headers.toJSON()['client'][0]);
          window.localStorage.setItem('uid',data.headers.toJSON()['uid'][0]);
          window.localStorage.setItem('token-type',data.headers.toJSON()['token-type'][0]);
          this.setHeaders();

      }

  }
  setHeaders(){
      this.access_token = window.localStorage.getItem('access-token');
      this.expiry = window.localStorage.getItem('expiry');
      this.uid = window.localStorage.getItem('uid');
      this.token_type = window.localStorage.getItem('token-type');
      this.client = window.localStorage.getItem('client');
  }

   getOrders(){
      var headers = new Headers();
      console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('access-token', this.access_token);
      headers.append('expiry', this.expiry);
      headers.append('token-type', this.token_type);
      headers.append('uid', this.uid);
      headers.append('client', this.client);

      return new Promise(resolve =>{
          this.http.get(this.baseUrl + '/orders', {headers: headers}).subscribe(data =>{
              if(data){
                  console.log(data);
                  this.orders = data.json();
                  if(data.headers.toJSON()['access-token'] != undefined){
                      this.getHeaders(data);
                  }
                  window.localStorage.setItem('orders', JSON.stringify(data.json()));
                  console.log(this.orders);
                  resolve(data.json());
              }
              else{
              }
          },
          err=>{
              console.log(err);

              if(err.statusText == 'Unauthorized'){
                  this.auth.logout();
              }
          });
      });

    }

    updateStatus(o_r_id, status){
        var headers = new Headers();
        console.log(this.access_token,this.expiry,this.token_type,this.uid, this.client);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('access-token', this.access_token);
        headers.append('expiry', this.expiry);
        headers.append('token-type', this.token_type);
        headers.append('uid', this.uid);
        headers.append('client', this.client);
  
        return new Promise(resolve =>{
            this.http.get(this.baseUrl + '/order_restaurant', {headers: headers}).subscribe(data =>{
                if(data){
                    console.log(data);
                    this.orders = data.json();
                    if(data.headers.toJSON()['access-token'] != undefined){
                        this.getHeaders(data);
                    }
                    window.localStorage.setItem('orders', JSON.stringify(data.json()));
                    console.log(this.orders);
                    resolve(data.json());
                }
                else{
                }
            },
            err=>{
                console.log(err);
  
                if(err.statusText == 'Unauthorized'){
                    
                }
            });
        });
          
    }

}