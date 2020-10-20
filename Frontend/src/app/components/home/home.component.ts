import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedUser: UserModel;
  constructor() { }

  fetchAllUsers() {

  }

  onSelectUser(user) {
    this.selectedUser = user;
  }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

}
