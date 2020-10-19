import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model.model';
import { WebserviceService } from './webservice.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  private userSubject: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;

  constructor(private webService: WebserviceService, private router: Router) {
    this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserModel {
    return this.userSubject.value;
  }

  showChatFor(user: UserModel) {
      
  }

  registerNewUser(payload: UserModel) {
    return this.webService.post('user/addNewUser', payload);
  }

  authenticateUser(email, password) {
    return this.webService.post('user/authenticateUser', { email, password })
      .pipe(map((user: UserModel) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  getAllRegisteredUsers() {
    return this.webService.get('user/getAllRegisteredUsers');
  }

  fetchAllChats() {
    return this.webService.get('chat/fetchAllChats');
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}
