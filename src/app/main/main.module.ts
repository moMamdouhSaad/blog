import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageContainerComponent } from './main-page-container/main-page-container.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';


@NgModule({
  declarations: [MainPageContainerComponent, HomeBannerComponent, PostListComponent, PostComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports:[MainPageContainerComponent]
})
export class MainModule { }
