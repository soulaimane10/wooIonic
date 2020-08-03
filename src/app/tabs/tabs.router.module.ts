import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from './../home/home.page';
import { CartPage } from './../cart/cart.page';
import { CategoriesPage } from './../categories/categories.page';

import { ProductsPage } from './../products/products.page';
import { ProductPage } from './../product/product.page';

//import { ContactPage } from './../contact/contact.page';
import { AccountPage } from './../account/account.page';
import { CheckoutAddressPage } from './../checkout/address/address.page';
import { CheckoutPage } from './../checkout/checkout/checkout.page';
import { OrderSummaryPage } from './../checkout/order-summary/order-summary.page';

import { AddressPage } from './../account/address/address.page';

import { EditAddressPage } from './../account/edit-address/edit-address.page';
import { ForgottenPage } from './../account/forgotten/forgotten.page';
import { LoginPage } from './../account/login/login.page';
import { OrderPage } from './../account/order/order.page';
import { OrdersPage } from './../account/orders/orders.page';

import { RegisterPage } from './../account/register/register.page';
import { SettingPage } from './../account/setting/setting.page';
import { AboutPage } from '../about/about.page';
import { ThankYouPage } from '../thank-you/thank-you.page';



const routes: Routes = [
 
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            component: HomePage,
          },
          {
            path: 'products/:id',
            children: [
              {
                path: '',
                component: ProductsPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductPage
                  },
                 
                ]
              }
            ]
          },
    
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              },
             
            ]
          },
          
        
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
                component: AboutPage
          }
        ]
      },

      {
        path: 'thank-you',
        children: [
          {
            path: '',
                component: ThankYouPage
          }
        ]
       
      },
    
      {
        path: 'categories',
        children: [
          {
            path: '',
            component: CategoriesPage
          },
          {
            path: 'products/:id',
            children: [
              {
                path: '',
                component: ProductsPage
              },
              {
                path: 'product/:id',
                children: [
                  {
                    path: '',
                    component: ProductPage
                  },
                 
                ]
              }
            ]
          },
          
        ]
      },
     
      {
        path: 'cart',
        children: [
          {
            path: '',
            component: CartPage
          },
          {
            path: 'address',
            component: CheckoutAddressPage
          },
          {
            path: 'checkout',
            component: CheckoutPage
          },
          {
            path: 'product/:id',
            children: [
              {
                path: '',
                component: ProductPage
              },
            
            ]
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            component: AccountPage
          },
          {
            path: 'address',
            children: [
              {
                path: '',
                component: AddressPage
              },
              {
                path: 'edit-address',
                component:EditAddressPage
              }
            ]
          },
          {
          path: 'register',
            component: RegisterPage
          },
         
          {
            path: 'setting',
            component: SettingPage
          },
         
        
          {
            path: 'orders',
            children: [
              {
                path: '',
                component: OrdersPage
              },
              {
                path: 'order/:id',
                component: OrderPage
              }
            ]
          },
          {
            path: 'login',
            children: [
              {
                path: '',
                component: LoginPage
              },
              {
                path: 'forgotten',
                component: ForgottenPage
              }
            ]
          },
          
         
         
      
        ]
      },


      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
