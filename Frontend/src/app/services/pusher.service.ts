import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';

// declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster
    });

    if (!this.channel) {
      console.log('subscribe');
      this.channel = this.pusher.subscribe('messages');
    }
  }
}
