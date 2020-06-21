import {Component, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NoticeListComponent} from "./modules/notice-list/notice-list.component";
import {NoticeComponent} from "./modules/notice/notice.component";
import {LoginComponent} from "./modules/login/login.component";


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'main', component: NoticeListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
