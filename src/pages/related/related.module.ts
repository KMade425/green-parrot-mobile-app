import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatedPage } from './related';

@NgModule({
  declarations: [
    RelatedPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatedPage),
  ],
})
export class RelatedPageModule {}
