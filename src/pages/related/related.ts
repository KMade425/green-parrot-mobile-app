import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as $ from 'jquery';


/**
 * Generated class for the RelatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-related',
  templateUrl: 'related.html',
})
export class RelatedPage {
  public posted_id: any;
  public shareMsg:string = null;
  public shareLink:string = null;
  selectedItem: any = [];
  public isLoading = false;
  public postcontent: string;
//	url: string = 'http://greenparrotnews.com/wp-json/wp/v2/posts/';

  constructor(public navCtrl: NavController, 
              public api:ApiProvider, 
              public navParams: NavParams,
              public platform: Platform, 
                private photoViewer: PhotoViewer,
                private socialSharing: SocialSharing) {
      if(this.posted_id = navParams.get('post_id')){
      // alert (this.posted_id);
      console.log(this.posted_id);
      this.getPostss();
    } else {
      this.navCtrl.pop();
    }
  }


  getPostss() {
      this.api.get('posts/'+ this.posted_id + '?_embed')
      .subscribe((data) =>  {
        this.selectedItem = data;
        this.postcontent = this.selectedItem.content.rendered;
        this.isLoading = true;
        console.log(data);
        $("div:contains('adsbygoogle')" ).css( "text-decoration", "underline");
      });
  }
    
  viewImage(theImageView) {
    if (this.platform.is('cordova')) {
      this.photoViewer.show(theImageView);
    }
  }
         
    
  shareit(item) {
	  if (this.platform.is('cordova')) {
      this.socialSharing.share(this.selectedItem.title.rendered + " - ", null, null, this.selectedItem.link)
      .then(()=>{
        
      }).catch(()=>{
      });
    } else {
      alert ("can not share");
    }
  }
    


  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatedPage');

  }

}
