import { Component, OnInit } from '@angular/core';
import {NgcastService} from '../services/ngcast.service';
import {CastingState} from '../models/casting-state';

@Component({
  selector: 'app-chromecast-page',
  templateUrl: './chromecast-page.component.html',
  styleUrls: ['./chromecast-page.component.scss']
})
export class ChromecastPageComponent implements OnInit {

  /* tslint:disable:no-string-literal */

  // Variables
  castingStatus: CastingState;
  constructor(
    private ngCastService: NgcastService
  ) { }

  ngOnInit(): void {

    const script = window['document'].createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
    window['document'].body.appendChild(script);

    const ngCastService = this.ngCastService;
    window['__onGCastApiAvailable'] = (isAvailable) => {
      if (isAvailable) {
        ngCastService.initializeCastApi();
      }
    };

    this.castingStatus = this.ngCastService.getStatus();
  }

  openSession(): void {
    this.ngCastService.discoverDevices();
  }

  closeSession(): void {
    this.ngCastService.stopMedia();
  }

}
