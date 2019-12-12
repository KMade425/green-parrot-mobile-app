import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ViewcatPage } from '../viewcat/viewcat';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(public navCtrl: NavController, private admobFree: AdMobFree, public navParams: NavParams, private platform: Platform) {
	  
  }
  
goHome() {
	this.navCtrl.setRoot(HomePage);
}
applications(categoryID, categorytitle) { 
  this.navCtrl.setRoot(ViewcatPage, {catID: categoryID, categorytitle: categorytitle});
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
	  if (this.platform.is('cordova')) {
			const bannerConfig: AdMobFreeBannerConfig = {
			id: 'ca-app-pub-8274567529996844/1299866351',
//			isTesting: true,
			 autoShow: true
			};
			this.admobFree.banner.config(bannerConfig);

			this.admobFree.banner.prepare()
			  .then(() => {
				// banner Ad is ready
				// if we set autoShow to false, then we will need to call the show method here
			  })
			  .catch(e => console.log(e));        
        
			let interstitialConfig: AdMobFreeInterstitialConfig = {
			id: 'ca-app-pub-8274567529996844/6638585534',
//			isTesting: true,
			 autoShow: true
			};
			this.admobFree.interstitial.config(interstitialConfig);
			this.admobFree.interstitial.prepare()
			  .then(() => {
				// interstitialConfig Ad is ready
				// if we set autoShow to false, then we will need to call the show method here
			  })
			  .catch(e => console.log(e));
        
	  }
    
  }

}
