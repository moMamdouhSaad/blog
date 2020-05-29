import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule
  ],
  exports:[HeaderComponent]
})
export class CoreModule { }
