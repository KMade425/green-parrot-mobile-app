import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { RelatedPage } from '../related/related';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as $ from 'jquery';

/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {
  public shareMsg:string = null;
  public shareLink:string = null;
  public post: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public platform: Platform, 
              private photoViewer: PhotoViewer,
              private socialSharing: SocialSharing) {
    this.post = navParams.get('post');
  }



  viewImage(theImageView) {
    if (this.platform.is('cordova')) {
      this.photoViewer.show(theImageView);
    }
  }
  
  
  related(post_id) {
    this.navCtrl.push(RelatedPage, {post_id: post_id});
  }
  
  
  shareit(item) {
	  if (this.platform.is('cordova')) {
      this.socialSharing.share(this.post.title.rendered + " - ", null, null, this.post.link)
      .then(()=>{
        
      }).catch(()=>{
      });
    } else {
      alert ("can not share");
    }
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');
    $("div>div>div>div>div>div:contains('adsbygoogle')" ).css( "display", "none");
    //alert ($("div>div>div>div>div>div:contains('adsbygoogle')" ).length);

  }

}
