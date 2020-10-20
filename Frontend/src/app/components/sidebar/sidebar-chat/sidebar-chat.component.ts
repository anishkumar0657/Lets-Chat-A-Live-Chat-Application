import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'src/app/models/user-model.model';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.css']
})

export class SidebarChatComponent implements OnInit {
  @Input() user: UserModel;
  @Output() selectedUser = new EventEmitter();
  userName: string;
  lastMessage: string;

  newMessageCount: number;

  constructor(private readonly chatService: ChatserviceService) { }

  showChatForUser() {
    // this.newMessageCount = 2;
    this.selectedUser.emit(this.user);
  }

  ngOnInit(): void {
    this.userName = this.user.firstName + ' ' + this.user.lastName;
  }
}
