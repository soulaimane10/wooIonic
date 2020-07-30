import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsPageRoutingModule } from './tabs.router.module';
import { TranslateModule } from '@ngx-translate/core';

import { KeysPipeModule } from './../pipes/pipe.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TabsPage } from './tabs.page';
import { HomePage } from './../home/home.page';
import { CartPage } from './../cart/cart.page';
import { CategoriesPage } from './../categories/categories.page';
import { ProductsPage } from './../products/products.page';
import { ProductPage } from './../product/product.page';

import { ContactPage } from './../contact/contact.page';
import { AccountPage } from './../account/account.page';
import { CheckoutAddressPage } from './../checkout/address/address.page';
import { CheckoutPage } from './../checkout/checkout/checkout.page';

import { AddressPage } from './../account/address/address.page';

import { EditAddressPage } from './../account/edit-address/edit-address.page';
import { ForgottenPage } from './../account/forgotten/forgotten.page';
import { LoginPage } from './../account/login/login.page';

import { OrderPage } from './../account/order/order.page';
import { OrdersPage } from './../account/orders/orders.page';

import { RegisterPage } from './../account/register/register.page';
import { SettingPage } from './../account/setting/setting.page';
import { AboutPage } from '../about/about.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule,
    KeysPipeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
  TabsPage,
  HomePage,
  CartPage,
  CategoriesPage,
 AboutPage,
  ProductsPage,
  ProductPage,
  ContactPage,
  AccountPage,
  CheckoutAddressPage,
  CheckoutPage,
  AddressPage,

  EditAddressPage,
  ForgottenPage,
  LoginPage,
  OrderPage,
  OrdersPage,
 
  RegisterPage,
  SettingPage,


  ]
})
export class TabsPageModule {}
