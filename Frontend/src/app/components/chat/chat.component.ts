import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private readonly chatService: ChatserviceService) { }

  fetchAllChats() {
    this.chatService.fetchAllChats().subscribe();
  }

  ngOnInit(): void {
    this.fetchAllChats();
  }

}
