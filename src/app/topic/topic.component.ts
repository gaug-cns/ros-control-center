import { Component, OnInit, Input } from '@angular/core';

declare var ROSLIB: any;
import 'roslib/build/roslib.js';

import { ros } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  private roslibTopic: any;
  private message: any;
  private isSubscribing = false;

  ngOnInit() {
    this.roslibTopic = new ROSLIB.Topic({
      ros,
      name: this.topic.name,
      messageType: this.topic.type,
    });


  }

  toggleSubscription(isSubscribing: boolean): void {
    console.log(this.topic);

    if (isSubscribing) {
      this.roslibTopic.subscribe(message => {
        this.message = message;
      });
    } else {
      this.roslibTopic.unsubscribe();
    }
    this.isSubscribing = isSubscribing;
  }

  publish(data: any): void {
    const message = new ROSLIB.Message(data);
    this.roslibTopic.publish(message);
  }
}
