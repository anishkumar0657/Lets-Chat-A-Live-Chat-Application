import { Component, OnInit } from '@angular/core';
import { UserModel } from './models/user-model.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  loggedInUser: UserModel;
  
  constructor() { }


  fetchAllUsers() {

  }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

}
