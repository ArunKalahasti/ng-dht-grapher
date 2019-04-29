import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-dht-grapher';

  servers = [
    "192.168.0.107",
    "192.168.0.109"
  ];

  constructor() { }

  ngOnInit() {
  }

}
