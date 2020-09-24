import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {CastingState} from '../models/casting-state';

@Injectable({
  providedIn: 'root'
})
export class NgcastService {

  /* tslint:disable:no-string-literal */

  // Variables
  private castSession;
  private cast;
  private currentMedia: any;
  public status: CastingState = {
    casting: false
  };

  private runningSessionsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(['Test1', 'Test2']);
  public runningSessions: Observable<any[]>;

  // Constructor
  constructor() {
    this.runningSessions = this.runningSessionsSubject.asObservable();
  }


  /*-----------------------------*/


  // Init Process
  initializeCastApi(): void {
    this.cast = window['chrome'].cast; // Get CAST
    const sessionRequest = new this.cast.SessionRequest(this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    const apiConfig = new this.cast.ApiConfig(sessionRequest,
      s => { },
      status => { if (status === this.cast.ReceiverAvailability.AVAILABLE) { } },
      this.cast.AutoJoinPolicy.ORIGIN_SCOPED
    );
    const x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
  }

  // Success emitter
  private onInitSuccess = (e) => {
    console.log('GCast initialization success');
    console.log(this.cast);
  }

  // Error emitter
  private onError = (err) => {
    console.log('GCast initialization failed', err);
  }


  // Speaks for itself.
  discoverDevices(): Subject<any> {
    const self = this;
    const subj = new Subject();
    this.cast.requestSession(
      (s) => {
        console.log(s);
        const sessionsCopy = self.runningSessionsSubject.getValue() as any[];
        console.log(sessionsCopy);
        sessionsCopy.push('lalalalalalala');
        self.runningSessionsSubject.next(sessionsCopy);
        subj.next(s);
      }, (err) => {
        if (err.code === 'cancel') {
          subj.error(err);
        } else {
          console.error('Error selecting a cast device', err);
        }
      });
    return subj;
  }



  // Launch the URL given
  launchMedia(media): boolean {
    const mediaInfo = new this.cast.media.MediaInfo(media);
    const request = new this.cast.media.LoadRequest(mediaInfo);
    console.log('launch media with session', this.castSession);

    if (!this.castSession) {
      window.open(media);
      return false;
    }
    this.castSession.loadMedia(request, this.onMediaDiscovered.bind(this, 'loadMedia'), this.onMediaError);
    return true;
  }

  // Discovered emitter
  onMediaDiscovered = (how, media) => {
    this.currentMedia = media;
  }
  onMediaError = (err) => {
    console.error('Error launching media', err);
  }


  // Media controls
  playMedia(): void { this.currentMedia.play(null); }
  pauseMedia(): void { this.currentMedia.pause(null); }
  stopMedia(): void { this.currentMedia.stop(null); }

  playUrl(session, url: string): void {
    const mediaInfo = this.cast.media.MediaInfo(url, 'text/html');
    const request = this.cast.media.LoadRequest(mediaInfo);
    session.loadMedia(request).then(
      () => { console.log('Load succeed'); },
      (errorCode) => { console.log('Error code: ' + errorCode); }
    );
  }

  setCasting(value): void {
    this.status.casting = value;
  }

  getStatus(): any {
    return this.status;
  }
}
