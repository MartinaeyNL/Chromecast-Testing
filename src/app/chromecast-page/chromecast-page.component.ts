import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgcastService} from '../services/ngcast.service';
import {CastingState} from '../models/casting-state';
import {Dashboard} from '../models/dashboard';

@Component({
  selector: 'app-chromecast-page',
  templateUrl: './chromecast-page.component.html',
  styleUrls: ['./chromecast-page.component.scss']
})
export class ChromecastPageComponent implements OnInit {

  /* tslint:disable:no-string-literal */

  // Variables
  castingStatus: CastingState;
  dashboards: Dashboard[];


  constructor(private ngCastService: NgcastService, private cdr: ChangeDetectorRef) {
    this.dashboards = [
      { name: 'Dashboardeen', url: '', activeCast: false },
      { name: 'Anderdashboard', url: '', activeCast: false }
    ];
    /*this.ngCastService.runningSessions.subscribe(
      (sessionList) => {
        console.log(sessionList);
      }
    );*/
  }

  ngOnInit(): void {

    // Loading official Casting library
    const script = window['document'].createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
    window['document'].body.appendChild(script);

    // Managing API in Service after load
    const ngCastService = this.ngCastService;
    window['__onGCastApiAvailable'] = (isAvailable) => {
      if (isAvailable) {
        ngCastService.initializeCastApi();
      }
    };

    // Set variables
    this.castingStatus = this.ngCastService.getStatus();
  }


  openSession(dashboard: Dashboard): void {
    // const indexOfArray = this.dashboards.findIndex(x => x.name === dashboard.name);
    this.ngCastService.discoverDevices().subscribe(
      value => {
        console.log('[discoverDevices] NEXT:');
        console.log(value);
        dashboard.activeCast = true;
        this.dashboards = [...this.dashboards];
        this.cdr.detectChanges();
        console.log(this.dashboards);
      },
      error => {
        console.log('[discoverDevices] ERROR:');
        console.log(error);
        if (error.code !== 'cancel') {
          console.log('Oh this is the real shit.');
        }
      },
      () => { console.log('[discoverDevices] COMPLETE!'); }
    );
  }

  closeSession(): void {
    this.ngCastService.stopMedia();
  }
  playUrl(session): void {
    this.ngCastService.playUrl(session, 'https://jarpis.nl/');
  }

}
