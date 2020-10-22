import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageModel } from 'src/app/models/message-model.model';
import { UserModel } from 'src/app/models/user-model.model';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() selectedUser = new EventEmitter();
  constructor(private readonly chatService: ChatserviceService) { }

  activeUsers: UserModel[] = [];
  loggedInUser: UserModel;
  unreadMessageArray;
  @Input() recievedMessageForOther: MessageModel;

  fetchAllUsers() {
    this.chatService.getAllRegisteredUsers().subscribe((users: UserModel[]) => {
      users.forEach(user => {
        if (user._id != this.loggedInUser._id) {
          this.activeUsers.push(user);
          
        }
      });
      this.makeUserAndUnreadMessageArray();
    },
      err => {
        console.log(err)
      });
  }

  onSelectedUser(user) {
    this.selectedUser.emit(user);
  }

  onLogout() {
    this.chatService.logout();
  }

  makeUserAndUnreadMessageArray() {
    this.unreadMessageArray = this.activeUsers.map(user => {
      return { userID: user._id, unreadMessageCount: 0 };
    })
  }

  ngOnInit(): void {
    this.loggedInUser = this.chatService.userValue;
    this.fetchAllUsers();
    // this.makeUserAndUnreadMessageArray();
  }
}
