import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NoticeListComponent} from "./modules/notice-list/notice-list.component";
import {NoticeComponent} from "./modules/notice/notice.component";


const routes: Routes = [
  { path: '', component: NoticeListComponent},
  { path: 'notice', component: NoticeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
