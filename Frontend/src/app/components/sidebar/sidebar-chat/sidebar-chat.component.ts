import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MessageModel } from 'src/app/models/message-model.model';
import { UserModel } from 'src/app/models/user-model.model';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.css']
})

export class SidebarChatComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: UserModel;
  @Output() selectedUser = new EventEmitter();
  @Input() recievedMessageForOther: MessageModel;
  @Input() unreadMessageArray;

  userName: string;
  lastMessage: string;
  unreadMessagesCount = [];

  newMessageCount = 0;
  hideBadge = false;
  active = false;


  constructor(private readonly chatService: ChatserviceService) { }

  showChatForUser() {
    this.active = true;
    this.selectedUser.emit(this.user);
  }

  getUnreadMessageCount(senderID) {
    this.unreadMessageArray.forEach(element => {
      if (element.userID == senderID) {
        this.newMessageCount = element.unreadMessageCount;
        // return element.unreadMessageCount;
      }
    });
  }

  shouldHideBadge() {
    return !(this.newMessageCount > 0);
  }

  incrementUnreadMessageCount(senderID) {
    console.log(senderID);
    console.log(this.unreadMessageArray.length);
    this.unreadMessageArray.forEach(element => {
      console.log(element);
      if (element.userID == senderID) {
        element.unreadMessageCount++;
      }
    });
    this.getUnreadMessageCount(senderID);
    console.log(this.unreadMessageArray);
  }

  ngOnDestroy() {
    this.active = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName) && changes['recievedMessageForOther'].previousValue != changes['recievedMessageForOther'].currentValue) {
        switch (propName) {
          case 'recievedMessageForOther': {
            console.log('recieved messagee');
            if (this.recievedMessageForOther.recieverID != this.user._id) {
              this.incrementUnreadMessageCount(this.recievedMessageForOther.senderID);
            }
          }
        }
      }
    }
    // if (changes.recievedMessageForOther) {
    //   console.log(this.recievedMessageForOther);
    //   if (this.recievedMessageForOther.recieverID != this.user._id) {
    //     this.incrementUnreadMessageCount(this.recievedMessageForOther.senderID);
    //   }
    // }
  }

  ngOnInit(): void {
    this.userName = this.user.firstName + ' ' + this.user.lastName;
  }
}
