import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   prevScrollpos = window.pageYOffset;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
  var currentScrollPos = window.pageYOffset;
  if (this.prevScrollpos > currentScrollPos) {
    document.getElementById("header-container").style.top = "0";
  } else {
    document.getElementById("header-container").style.top = "-70px";
  }
  this.prevScrollpos = currentScrollPos;

}

}
