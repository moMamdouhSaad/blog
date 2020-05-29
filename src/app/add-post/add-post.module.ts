import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostContainerComponent } from './add-post-container/add-post-container.component';


@NgModule({
  declarations: [AddPostContainerComponent],
  imports: [
    CommonModule,
    AddPostRoutingModule
  ]
})
export class AddPostModule { }
