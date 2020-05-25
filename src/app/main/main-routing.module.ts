import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageContainerComponent } from './main-page-container/main-page-container.component';


const routes: Routes = [{path:'home',component:MainPageContainerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
