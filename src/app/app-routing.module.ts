import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [{
  path:'',
  redirectTo:'/home',
  pathMatch:'full'
  },
  {
  path:'add-post',
  loadChildren:()=>import('./add-post/add-post.module').then(m=>m.AddPostModule),
  canActivate: [AuthGuardService],
  data:{roles:['admin', 'user']}
  },
  {
    path:'dashboard',
    loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate: [AuthGuardService],
    data:{roles:['admin']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
