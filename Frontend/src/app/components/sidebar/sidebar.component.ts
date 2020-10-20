import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  fetchAllUsers() {
    this.chatService.getAllRegisteredUsers().subscribe((users: UserModel[]) => {
      users.forEach(user => {
        if (user._id != this.loggedInUser._id) {
          this.activeUsers.push(user);
        }
      })
    },
      err => {
        console.log(err)
      });
  }

  onSelectedUser(user) {
    this.selectedUser.emit(user);
  }

  ngOnInit(): void {
    this.loggedInUser = this.chatService.userValue;
    this.fetchAllUsers();
  }
}
