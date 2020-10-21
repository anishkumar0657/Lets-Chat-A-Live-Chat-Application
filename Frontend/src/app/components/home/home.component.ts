import { Component, OnInit } from '@angular/core';
import { MessageModel } from 'src/app/models/message-model.model';
import { UserModel } from 'src/app/models/user-model.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedUser: UserModel;
  recievedMessageForOther: MessageModel;

  constructor() { }

  fetchAllUsers() {

  }

  onRecievedMessageForOther(message) {
    console.log('in home component');
    this.recievedMessageForOther = message;
  }

  onSelectUser(user) {
    this.selectedUser = user;
  }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

}
