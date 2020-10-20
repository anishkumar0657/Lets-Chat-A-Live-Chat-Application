import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { MessageModel } from 'src/app/models/message-model.model';
import { UserModel } from 'src/app/models/user-model.model';
import { ChatserviceService } from 'src/app/services/chatservice.service';
import { PusherService } from 'src/app/services/pusher.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() selectedUser: UserModel;
  chatToShow = false;
  messageBody;
  messageToSend = new MessageModel();

  chatDetails: MessageModel[] = [];

  loggedInUser: UserModel;

  constructor(private readonly chatService: ChatserviceService, private pusherService: PusherService) { }

  fetchChatForUserWith(selectedUserID, loggedInUserID) {
    this.chatService.fetchChatWithUser(selectedUserID, loggedInUserID).subscribe((chats: MessageModel[]) => {
      this.chatToShow = true;
      this.chatDetails = chats;
    }, err => {
      console.log(err);
    });
  }

  sendMessage() {
    this.formMessage();
    this.chatService.sendMessage(this.messageToSend).subscribe(result => {
      this.messageBody = "";
    });
  }

  formMessage() {
    this.messageToSend.message = this.messageBody;
    this.messageToSend.senderID = this.chatService.userValue._id;
    this.messageToSend.recieverID = this.selectedUser._id;
    this.messageToSend.timeStamp = new Date(Date.now()).toString();
  }

  configurePusher() {
    this.pusherService.channel.bind('inserted', function (data) {
      // this.chatDetails = data;
      // this.chatDetails.push(data);
      console.log(data);
      // this.pushToMessageArray(data);
      // alert(JSON.stringify(data));
    });
  }

  pushToMessageArray(data) {
    console.log(data);
  }


  ngOnChanges() {
    // api to fetch chat for this user and logged in user
    this.chatDetails = null;
    this.configurePusher();
    this.fetchChatForUserWith(this.selectedUser._id, this.chatService.userValue._id);
  }


  ngOnInit(): void {
    this.loggedInUser = this.chatService.userValue;

  }
}
