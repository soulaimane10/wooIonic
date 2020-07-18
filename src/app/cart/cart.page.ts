import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Config } from '../config';
import { Data } from '../data';
import { Settings } from '../data/settings';
import { HttpParams } from "@angular/common/http";
import { Product } from '../data/product';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.page.html',
    styleUrls: ['cart.page.scss']
})
export class CartPage {
    coupon: any;
    cart: any = {};
    couponMessage: any;
    status: any;
    loginForm: any = {};
    errors: any;
    lan: any = {};
    constructor(public translate: TranslateService, private alertCtrl: AlertController, public toastController: ToastController, public config: Config, public api: ApiService, public data: Data, public router: Router, public settings: Settings, public loadingController: LoadingController, public navCtrl: NavController, public route: ActivatedRoute, public productData: Product) {}
    ngOnInit() {
        this.translate.get(['Requested quantity not available'  ]).subscribe(translations => {
          this.lan.lowQuantity = translations['Requested quantity not available'];
        });
    }
    ionViewDidEnter() {
        this.getCart();
    }
    async getCart() {
        await this.api.postItem('cart').subscribe(res => {
            this.cart = res;
            this.data.updateCart(this.cart.cart_contents);
        }, err => {
            console.log(err);
        });
    }
    checkout() {
        if(this.settings.customer.id) {
            this.navCtrl.navigateForward('/tabs/cart/address');
        }
        else this.login();
    }

    getProduct(id){
        this.productData.product = {};
        this.navCtrl.navigateForward(this.router.url + '/product/' + id);
    }
    async deleteItem(itemKey, qty) {
        await this.api.postItem('remove_cart_item&item_key=' + itemKey).subscribe(res => {
            this.cart = res;
            this.data.updateCart(this.cart.cart_contents);
        }, err => {
            console.log(err);
        });
    }
    async submitCoupon(coupon) {
        await this.api.postItem('apply_coupon', {
            coupon_code: coupon
        }).subscribe(res => {
            this.couponMessage = res;
            if(this.couponMessage != null && this.couponMessage.notice) {
                this.presentToast(this.couponMessage.notice)
            }
            this.getCart();
        }, err => {
            console.log(err);
        });
    }
    async removeCoupon(coupon) {
        await this.api.postItem('remove_coupon', {
            coupon: coupon
        }).subscribe(res => {
            this.getCart();
        }, err => {
            console.log(err);
        });
    }

    async addToCart(id, item){
        console.log(this.data.cart[id]);
        console.log(item.value.manage_stock);
        if(item.value.manage_stock && (item.value.stock_quantity <= item.value.quantity)) {
            this.presentToast(this.lan.lowQuantity);
        } else {
            if (this.data.cartItem[item.key].quantity != undefined && this.data.cartItem[item.key].quantity == 0) {
                this.data.cartItem[item.key].quantity = 0
            }
            else {
                this.data.cartItem[item.key].quantity += 1
            };
            if (this.data.cart[id] != undefined && this.data.cart[id] == 0) {
                this.data.cart[id] = 0
            }
            else {
                this.data.cart[id] += 1
            };
            var params: any = {};
            params.key = item.key;
            params.quantity = this.data.cartItem[item.key].quantity;
            params.update_cart = 'Update Cart';
            params._wpnonce = this.cart.cart_nonce;
            await this.api.postItem('update-cart-item-qty', params).subscribe(res => {
                this.cart = res;
                this.data.updateCart(this.cart.cart_contents);
            }, err => {
                console.log(err);
            });
        }
    }

    async deleteFromCart(id, key){

        if (this.data.cartItem[key].quantity != undefined && this.data.cartItem[key].quantity == 0) {
            this.data.cartItem[key].quantity = 0;
        }
        else {
            this.data.cartItem[key].quantity -= 1;
        };
        if (this.data.cart[id] != undefined && this.data.cart[id] == 0) {
            this.data.cart[id] = 0
        }
        else {
            this.data.cart[id] -= 1
        };
        var params: any = {};
        params.key = key;
        params.quantity = this.data.cartItem[key].quantity;
        params.update_cart = 'Update Cart';
        params._wpnonce = this.cart.cart_nonce;

        await this.api.postItem('update-cart-item-qty', params).subscribe(res => {
            this.cart = res;
            this.data.updateCart(this.cart.cart_contents);
        }, err => {
            console.log(err);
        });
    }
    //----------Rewrad-----------------//
    redeem(){
       // wc_points_rewards_apply_discount_amount: 
       // wc_points_rewards_apply_discount: Apply Discount
        this.api.postItem('ajax_maybe_apply_discount').subscribe(res =>{
            console.log(res);
            this.getCart();
            })
    }

    async login() {
          let alert = await this.alertCtrl.create({
              header: 'Connectez-vous et continuez',
              inputs: [{
                  name: 'Nom dutilisateur',
                  placeholder: 'Email/Nom dutilisateur',
                  type: 'text'
              },
              {
                  name: 'mot de passe',
                  placeholder: 'mot de passe',
                  type: 'text'
              }],
              buttons: [{
                  text: 'valider la commande',
                  role: 'cancel',
                  handler: data => {
                    this.navCtrl.navigateForward('/tabs/cart/address');
                  }
              }, {
                  text: 'se connecter',
                  handler: data => {
                      this.onSubmit(data);
                  }
              }]
          });
          alert.present();
      }
      async onSubmit(userData) {
        this.loginForm.username = userData.username;
        this.loginForm.password = userData.password;
        console.log(this.loginForm);
        await this.api.postItem('se connecter', this.loginForm).subscribe(res => {
            this.status = res;
            if (this.status.errors != undefined) {
                this.errors = this.status.errors;
                this.inValidUsername();
            } else if (this.status.data) {
                this.settings.customer.id = this.status.ID;
                if(this.status.allcaps.dc_vendor || this.status.allcaps.seller || this.status.allcaps.wcfm_vendor){
                    this.settings.vendor = true;
                }
                if(this.status.allcaps.administrator) {
                    this.settings.administrator = true;
                }
                this.navCtrl.navigateForward('/tabs/cart/address');
            }
        }, err => {
            console.log(err);
        });
    }
    async inValidUsername() {
        const alert = await this.alertCtrl.create({
          header: 'Warning',
          message: 'Invalid Username or Password',
          buttons: ['OK']
        });
        await alert.present();
    }
    async presentToast(message) {
        const toast = await this.toastController.create({
          message: message,
          duration: 2000,
          position: 'top'
        });
        toast.present();
    }
}