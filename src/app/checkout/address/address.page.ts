import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CheckoutData } from '../../data/checkout';
import { Settings } from './../../data/settings';

@Component({
    selector: 'app-address',
    templateUrl: './address.page.html',
    styleUrls: ['./address.page.scss'],
})
export class CheckoutAddressPage implements OnInit {
    

 cities: any[] = [
    {
   
     nome: 'Agadir',
      
    },
    {
     
      nome: 'Al hoceima',
    
    },
    {
      
     nome: 'Aoussered',
     
    },

    {
    
     nome: 'Assilah',
     
    },

    {
    
    nome: 'Ben ahmed',
     
    },

    {
    
     nome: 'Beni mellal',
     
    },
  
{
   
      nome: 'Benslimane',
     
    },

  {
 
      nome: 'Berkane',
     
    },

  {
     
     nome: 'Boujdour',
     
    },

 {
    
     nome: 'Bouskoura',
     
    },


 {
     
     nome: 'Bouznika',
     
    },

{
      
     nome: 'Casablanca',
     
    },


{
      
     nome: 'Chafchaouen',
     
    },

{
      
     nome: 'Dakhla',
     
    },

{
      
     nome: 'El hajeb',
     
    },

{
      
     nome: 'El jadida',
     
    },

{
      
     nome: 'Errachidia',
     
    },

{
      
     nome: 'Essaoira',
     
    },

{
      
     nome: 'Essmara',
     
    },

{
      
     nome: 'Fkih ben salah',
     
    },

{
      
     nome: 'Fnideq',
     
    },

{
      
     nome: 'Fés',
     
    },


{
      
     nome: 'Guelmim',
     
    },


{
      
     nome: 'Guercif',
     
    },


{
      
     nome: 'Ifran',
     
    },



{
      
     nome: 'Kabila',
     
    },



{
      
     nome: 'Khenifra',
     
    },



{
      
     nome: 'Khmissat',
     
    },



{
      
     nome: 'Khouribga',
     
    },



{
      
     nome: 'Ksar el akbir',
     
    },



{
      
     nome: 'Kénitra',
     
    },



{
      
     nome: 'Laayoune',
     
    },



{
      
     nome: 'Larache',
     
    },


{
      
     nome: 'M\'diq',
     
    },


{
      
     nome: 'Marrakech',
     
    },
{
      
     nome: 'Martil',
     
    },
{
      
     nome: 'Meknès',
     
    },
{
      
     nome: 'Melilia',
     
    },
{
      
     nome: 'Midelt',
     
    },
{
      
     nome: 'Mohammedia',
     
    },
{
      
     nome: 'Nador',
     
    },
{
      
     nome: 'Oualidia',
     
    },
{
      
     nome: 'Ouarzazate',
     
    },
{
      
     nome: 'Ouazzane',
     
    },
{
      
     nome: 'Oujda',
     
    },
{
      
     nome: 'Rabat',
     
    },
{
      
     nome: 'Safi',
     
    },
{
      
     nome: 'Saidia',
     
    },
{
      
     nome: 'Fnideq',
     
    },
{
      
     nome: 'Salé',
     
    },
{
      
     nome: 'Sebta',
     
    },
{
      
     nome: 'Sefrou',
     
    },
{
      
     nome: 'Settat',
     
    },
{
      
     nome: 'Sidi bennour',
     
    },



{
      
     nome: 'Sidi ifni',
     
    },
{
      
     nome: 'Sidi kacem',
     
    },

{
      
     nome: 'Sidi rahal',
     
    },

{
      
     nome: 'Sidi slimane',
     
    },


{
      
     nome: 'Tamensourte',
     
    },
{
      
     nome: 'Tamesna',
     
    },


{
      
     nome: 'Tantan',
     
    },
{
      
     nome: 'Tanger',
     
    },

{
      
     nome: 'Tarfaya',
     
    },

{
      
     nome: 'Taroudant',
     
    },

{
      
     nome: 'Taza',
     
    },

{
      
     nome: 'Tetouan',
     
    },

{
      
     nome: 'Tifelt',
     
    },


{
      
     nome: 'Tinghir',
     
    },

{
      
     nome: 'Tiznit',
     
    },


{
      
     nome: 'Temara',
     
    },

{  
     nome: 'Temara',  
    },
  ];

    errorMessage: any;
    loader: boolean = false;
    countries: any;
    public   country:string;
    constructor(public api: ApiService, public checkoutData: CheckoutData, public router: Router, public navCtrl: NavController, public settings: Settings, public route: ActivatedRoute) {}
    ngOnInit() {
        this.getCheckoutForm();
        //this.getCountries();
    }
    async getCheckoutForm() {
        this.loader = true;
        await this.api.postItem('get_checkout_form').subscribe(res => {
            this.checkoutData.form = res;
            this.checkoutData.form.sameForShipping = true;
            if(this.checkoutData.form.countries.length == 1) {
                this.checkoutData.form.billing_country = this.checkoutData.form.countries[0].value;
                this.checkoutData.form.shipping_country = this.checkoutData.form.countries[0].value;
            }
            this.loader = false;
        }, err => {
            console.log(err);
            this.loader = false;
        });
    }
    getCountries() {
        this.api.getItem('settings/general/woocommerce_specific_allowed_countries').subscribe(res => {
            this.countries = res;
        }, err => {
            console.log(err);
        });
    }
    getBillingRegion() {
        this.checkoutData.billingStates = this.checkoutData.form.countries.find(item => item.value == this.checkoutData.form.billing_country);
      
    }
    getShippingRegion() {
        this.checkoutData.shippingStates = this.checkoutData.form.countries.find(item => item.value == this.checkoutData.form.shipping_country);
        
    }
    async updateOrderReview() {
        await this.api.postItem('update_order_review').subscribe(res => {
            this.checkoutData.orderReview = res;
        }, err => {
            console.log(err);
        });
    }
    
    continueCheckout() {

        this.errorMessage  = '';

        if(this.validateForm()){
            if(!this.checkoutData.form.ship_to_different_address)
            this.assgnShippingAddress();
            this.navCtrl.navigateForward('/tabs/cart/checkout');
        }
    }

    validateForm(){
        if(this.checkoutData.form.billing_first_name == '' || this.checkoutData.form.billing_first_name == undefined){
            this.errorMessage = 'Le prénom de facturation est un champ obligatoire';
            return false;
        }

        if(this.checkoutData.form.billing_last_name == '' || this.checkoutData.form.billing_last_name == undefined){
            this.errorMessage = 'Le nom de famille de facturation est un champ obligatoire';
            return false;
        }

        if(this.checkoutData.form.billing_phone == '' || this.checkoutData.form.billing_phone == undefined){
            this.errorMessage = 'Le téléphone de facturation est un champ obligatoire';
            return false;
        }

        if(this.checkoutData.form.billing_address_1 == '' || this.checkoutData.form.billing_address_1 == undefined){
            this.errorMessage = 'L\'adresse de facturation est un champ obligatoire';
            return false;
        }

        if(this.checkoutData.form.billing_city == '' || this.checkoutData.form.billing_city == undefined){
            this.errorMessage = 'La ville de facturation est un champ obligatoire';
            return false;
        }

        if(this.checkoutData.form.billing_postcode == '' || this.checkoutData.form.billing_postcode == undefined){
            this.errorMessage = 'Le code postal de facturation est un champ obligatoire';
            return false;
        }

        if(this.checkoutData.form.billing_country == '' || this.checkoutData.form.billing_country == undefined){
            this.errorMessage = 'Le pays de facturation est un champ obligatoire';
            return false;
        }

       
        if(this.checkoutData.form.ship_to_different_address){
                if(this.checkoutData.form.shipping_first_name == '' || this.checkoutData.form.shipping_first_name == undefined){
                    this.errorMessage = 'Le prénom d\'expédition est un champ obligatoire';
                    return false;
                }

                if(this.checkoutData.form.shipping_last_name == '' || this.checkoutData.form.shipping_last_name == undefined){
                    this.errorMessage = 'Le nom de famille d\'expédition est un champ obligatoire';
                    return false;
                }

                if(this.checkoutData.form.shipping_address_1 == '' || this.checkoutData.form.shipping_address_1 == undefined){
                    this.errorMessage = 'L\'adresse postale d\'expédition est un champ obligatoire';
                    return false;
                }

                if(this.checkoutData.form.shipping_city == '' || this.checkoutData.form.shipping_city == undefined){
                    this.errorMessage = 'La ville de livraison est un champ obligatoire';
                    return false;
                }

                if(this.checkoutData.form.shipping_postcode == '' || this.checkoutData.form.shipping_postcode == undefined){
                    this.errorMessage = 'Shipping post code is a required field';
                    return false;
                }

                if(this.checkoutData.form.shipping_country == '' || this.checkoutData.form.shipping_country == undefined){
                    this.errorMessage = 'Le code postal d\'expédition est un champ obligatoire';
                    return false;
                }

              
                return true;
        }

        else return true;
    }

    assgnShippingAddress(){
        this.checkoutData.form.shipping_first_name = this.checkoutData.form.billing_first_name;
        this.checkoutData.form.shipping_last_name = this.checkoutData.form.billing_last_name;
        this.checkoutData.form.shipping_address_1 = this.checkoutData.form.billing_address_1;
        this.checkoutData.form.shipping_city = this.checkoutData.form.billing_city;
        this.checkoutData.form.shipping_postcode = this.checkoutData.form.billing_postcode;
        this.checkoutData.form.shipping_country = this.checkoutData.form.billing_country;
        return true;
    }
}