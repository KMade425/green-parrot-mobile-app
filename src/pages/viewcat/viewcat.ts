import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import {PostDetailPage} from '../post-detail/post-detail';
import { CategoriesPage } from '../categories/categories';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-viewcat',
  templateUrl: 'viewcat.html',
})
export class ViewcatPage {

public items: any = [];
private per_page: number = 9;
private page:number = 1;
public showLoadMore = true;
private isLoading = false;
public categoryID:number;
public catTitle: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider, private admobFree: AdMobFree, private platform: Platform) {
    this.categoryID = navParams.get('catID');
    this.catTitle = navParams.get('categorytitle');
  //  alert (this.catTitle);
    this.getPosts();
  }


getPosts(){
	this.api.get('posts?_embed&categories='+this.categoryID+'&per_page='+this.per_page+'&page=' +this.page+'&order=desc&datetimetime='+new Date())
	.subscribe((data:any) =>  {
		this.items = this.items.concat(data);
		if(data.length===this.per_page){
			this.isLoading = true;
		}
		this.page++;
		this.per_page++;
		this.isLoading = true;
		console.log(data);
	}, (error) => {
		if(error.error.code === "rest_post_invalid_page_number"){
			this.showLoadMore = false;
			this.isLoading = true;
		}
		console.log(error);
	});
}

doInfinite(infiniteScroll) {
	console.log('Begin async operation');
	this.getPosts();
	setTimeout(() => {
		console.log('Async operation has ended');
		infiniteScroll.complete();
	}, 10000);
}


openDetail(item) {
	this.navCtrl.push(PostDetailPage, {post: item});
}

itemTapped(event, item) {
	this.navCtrl.push(PostDetailPage, {item: item});
}

menubar() {
	this.navCtrl.push(CategoriesPage);
}

facebook(footlinks) {
  window.open(footlinks, '_system', 'location=yes');
}

  ionViewDidLoad() {
	  if (this.platform.is('cordova')) {
			const bannerConfig: AdMobFreeBannerConfig = {
			id: 'ca-app-pub-8274567529996844/1299866351',
			isTesting: true,
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
			isTesting: true,
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
