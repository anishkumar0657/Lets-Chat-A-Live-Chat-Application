import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model.model';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private readonly chatService: ChatserviceService) { }

  activeUsers;

  fetchAllUsers() {
    this.chatService.getAllRegisteredUsers().subscribe(users => {
      this.activeUsers = users;
    },
      err => {
        console.log(err)
      });
  }

  ngOnInit(): void {
    this.fetchAllUsers();
  }


}
