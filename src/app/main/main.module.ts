import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageContainerComponent } from './main-page-container/main-page-container.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';


@NgModule({
  declarations: [MainPageContainerComponent, HomeBannerComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports:[MainPageContainerComponent]
})
export class MainModule { }
