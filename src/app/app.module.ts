import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AdMobFree } from '@ionic-native/admob-free';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoViewer } from '@ionic-native/photo-viewer';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostDetailPage } from '../pages/post-detail/post-detail';
import { CategoriesPage } from '../pages/categories/categories';
import { ViewcatPage } from '../pages/viewcat/viewcat';
import { RelatedPage } from '../pages/related/related';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	PostDetailPage,
  CategoriesPage,
  ViewcatPage, RelatedPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	PostDetailPage,
  CategoriesPage,
  ViewcatPage, RelatedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
  AdMobFree,
  SocialSharing,
  PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
