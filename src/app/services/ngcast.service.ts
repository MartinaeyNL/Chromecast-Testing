import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CastingState} from "../models/casting-state";

@Injectable({
  providedIn: 'root'
})
export class NgcastService {

  // Variables
  private castSession;
  private cast;
  private currentMedia: any;
  public status: CastingState = {
    casting: false
  };

  // Constructor
  constructor() {}


  /*-----------------------------*/


  // Init Process
  initializeCastApi(): void {
    this.cast = window['chrome'].cast;
    const sessionRequest = new this.cast.SessionRequest(this.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    const apiConfig = new this.cast.ApiConfig(sessionRequest,
      s => { },
      status => { if (status === this.cast.ReceiverAvailability.AVAILABLE) { } }
    );
    const x = this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
  }

  // Success emitter
  private onInitSuccess = (e) => {
    console.log('GCast initialization success');
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
        self.castSession = s;
        self.setCasting(true);
        subj.next('CONNECTED');
      }, (err) => {
        self.setCasting(false);
        if (err.code === 'cancel') {
          self.castSession = undefined;
          subj.next('CANCEL');
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


  setCasting(value): void {
    this.status.casting = value;
  }

  getStatus(): any {
    return this.status;
  }
}
