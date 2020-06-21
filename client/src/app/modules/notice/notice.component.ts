import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {Notice} from "../../shared/models/notice";
import {NoticeService} from "../../core/services/notice.service";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
  providers : [NoticeService]
})
export class NoticeComponent implements OnInit {

  @Input('objectId') selectedObjectId : String;
  public imageString: String;
  uploading: boolean = false;
  notice: Notice;
  notices: Notice[];
  finalNoticeList: Notice[] = [];
  noticeForm = new FormGroup({
    image: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),

  });

  constructor(private noticeService: NoticeService) {
  }

  ngOnInit(): void {
  }

  deleteNotice(id: any) {

    this.noticeService.deleteNotice(id).subscribe(data => {
      this.getNoticeList();
    });
  }

  addNotice(){
    let newNotice = new Notice();
    newNotice.title = this.noticeForm.controls.title.value;
    newNotice.description = this.noticeForm.controls.description.value;
    newNotice.image = "test";
    this.noticeService.addNotices(newNotice).subscribe(notice=>{
      this.getNoticeList();
    })

  }

  getNoticeList() {
    this.noticeService.getNotices()
      .subscribe(notices => {
        this.notices = notices;
        this.finalNoticeList = notices;
      });
  }

}
