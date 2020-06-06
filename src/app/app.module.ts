import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { MaterialsModule } from './materials.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MainModule,
    AuthModule,
    MaterialsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'blog'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
