import { Component, OnInit } from '@angular/core';
import {NoticeService} from "../../core/services/notice.service";
import {Notice} from "../../shared/models/notice";
import {FormControl} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {MatDialog} from "@angular/material/dialog";
import {NoticeComponent} from "../notice/notice.component";
import {AddNoticeComponent} from "../notice/add-notice/add-notice.component";

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css'],
  providers : [NoticeService]
})
export class NoticeListComponent implements OnInit {

  objectId : string ;
  notices : Notice[];
  selectedNotice : Notice;
  finalNoticeList : Notice[] = [];
  isUser : boolean =false;
  isAdmin : boolean = false;
  searchNoticeList : Notice[] = [];
  search = new FormControl();

  constructor(private noticeService : NoticeService, private dialog: MatDialog) { }

  ngOnInit(): void {
   this.getNoticeList();
   this.searchTrigger();
    const token = JSON.parse(localStorage.getItem('user'));

    if(token.role == 'User'){
      this.isUser = true;
    }
    if(token.role == 'Admin'){
      this.isAdmin = true;
    }
  }

  searchTrigger() {

    this.search.valueChanges.subscribe(value => {
      const finalList = [];
      this.finalNoticeList.forEach(notice => {
        if (notice.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          finalList.push(notice);
        }
      });
      this.notices = finalList;
    });

  }

  viewDetail(stepper : MatStepper, id : string){
    console.log("id  "+id);
    this.objectId = id;
    stepper.next();
  }


  getNoticeList() {
    this.noticeService.getNotices()
      .subscribe(notices => {
        this.notices = notices;
        this.finalNoticeList = notices;
      });
  }

  addNews() {
    let dialogRef: any;
    dialogRef = this.dialog.open(AddNoticeComponent, {
      width: '800px',
      maxHeight: '800px',
      data: {
        yes: false,

      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
