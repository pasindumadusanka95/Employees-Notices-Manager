import { Component, OnInit } from '@angular/core';
import {NoticeService} from "../../core/services/notice.service";
import {Notice} from "../../shared/models/notice";
import {FormControl} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css'],
  providers : [NoticeService]
})
export class NoticeListComponent implements OnInit {

  notices : Notice[];
  finalNoticeList : Notice[] = [];
  objectId : String ;
  searchNoticeList : Notice[] = [];
  search = new FormControl();

  constructor(private noticeService : NoticeService) { }

  ngOnInit(): void {

   this.getNoticeList();
   this.searchTrigger();

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

  viewDetail(stepper : MatStepper){
    stepper.next();
  }

  getNoticeList(){
    this.noticeService.getNotices()
      .subscribe(notices => {
        this.notices = notices;
        this.finalNoticeList = notices;
      });


  }
}
