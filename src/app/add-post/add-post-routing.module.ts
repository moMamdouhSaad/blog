import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostContainerComponent } from './add-post-container/add-post-container.component';


const routes: Routes = [{path: '', component: AddPostContainerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPostRoutingModule { }
