import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { LoaderService } from './shared/services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog';
  loading = false;

  constructor(private router: Router, private loaderService: LoaderService){
    //loading on request and respond
    loaderService.getLoaderValue$().subscribe(data=>this.loading = data)

    //loading on navigation
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          // this.loading = false;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          break;
        }
        default: {
          break;
        }
      }
    });


  }


}
