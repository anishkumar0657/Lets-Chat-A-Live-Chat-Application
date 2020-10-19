import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model.model';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.css']
})
export class SidebarChatComponent implements OnInit {
  @Input() user: UserModel;
  userName: string;
  lastMessage: string;

  constructor(private readonly chatService: ChatserviceService) { }

  showChat() {
    this.chatService.showChatFor(this.user);
  }

  ngOnInit(): void {
    this.userName = this.user.firstName + ' ' + this.user.lastName;
  }
}
