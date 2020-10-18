import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../app/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatComponent } from './components/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarChatComponent } from './components/sidebar/sidebar-chat/sidebar-chat.component';
import { HttpClientModule } from '@angular/common/http';

import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatComponent,
    SidebarChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AvatarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
