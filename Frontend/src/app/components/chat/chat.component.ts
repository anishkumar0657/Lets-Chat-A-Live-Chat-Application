import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { emit } from 'process';
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
  @ViewChild('chatContent') private myScrollContainer: any;
  @Output() recievedMessageForOther = new EventEmitter();

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
    console.log('config pusher');
    this.pusherService.channel.bind('inserted', (data) => {
      console.log(data);
      this.pushToMessageArray(data);
    });
  }

  pushToMessageArray(data) {
    if ((this.selectedUser._id == data.senderID && data.recieverID == this.loggedInUser._id)
      || (this.selectedUser._id == data.recieverID && data.senderID == this.loggedInUser._id)) {
      this.chatDetails.push(data);
      this.scrollToBottom();
    }
    else {
      console.log('this is for someone else');
      this.onRecievedMessageForOther(data);
    }
  }

  onRecievedMessageForOther(message) {
    console.log('emit');
    this.recievedMessageForOther.emit(message);
  }

  scrollToBottom(): void {
    const el = this.myScrollContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  ngOnChanges() {
    // api to fetch chat for this user and logged in user
    this.chatDetails = null;
    this.fetchChatForUserWith(this.selectedUser._id, this.chatService.userValue._id);

  }

  ngOnInit(): void {
    this.loggedInUser = this.chatService.userValue;
    this.configurePusher();
  }
}
