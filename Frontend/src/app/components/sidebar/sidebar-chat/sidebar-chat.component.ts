import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MessageModel } from 'src/app/models/message-model.model';
import { UserModel } from 'src/app/models/user-model.model';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.css']
})

export class SidebarChatComponent implements OnInit, OnChanges {
  @Input() user: UserModel;
  @Output() selectedUser = new EventEmitter();
  @Input() recievedMessageForOther: MessageModel;
  @Input() unreadMessageArray;

  userName: string;
  lastMessage: string;
  unreadMessagesCount = [];

  newMessageCount = 0;
  hideBadge = false;

  constructor(private readonly chatService: ChatserviceService) { }

  showChatForUser() {
    this.selectedUser.emit(this.user);
  }

  getUnreadMessageCount() {
    this.unreadMessageArray.forEach(element => {
      if (element.userID == this.user._id) {
        return element.unreadMessageCount;
      }
    });
  }

  shouldHideBadge() {
    return false;
  }

  incrementUnreadMessageCount(senderID) {
    this.unreadMessageArray.forEach(element => {
      if (element.userID == senderID) {
        element.unreadMessageCount++;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName) && changes['recievedMessageForOther'].previousValue != changes['recievedMessageForOther'].currentValue) {
        switch (propName) {
          case 'recievedMessageForOther': {
            console.log('recieved messagee');
            this.incrementUnreadMessageCount(this.recievedMessageForOther.senderID);
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.userName = this.user.firstName + ' ' + this.user.lastName;
  }
}
