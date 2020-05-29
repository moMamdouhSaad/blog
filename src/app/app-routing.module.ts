import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [{
  path:'',
  redirectTo:'/home',
  pathMatch:'full'
  },
  {
  path: 'add-post',
  loadChildren:()=>import('./add-post/add-post.module').then(m=>m.AddPostModule),
  canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
