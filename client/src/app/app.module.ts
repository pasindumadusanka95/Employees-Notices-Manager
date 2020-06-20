import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticeComponent } from './modules/notice/notice.component';
import { NoticeListComponent } from './modules/notice-list/notice-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticeComponent,
    NoticeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
