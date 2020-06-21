import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class NoticeComponent implements OnInit, OnChanges {

  @Input('objectId') selectedObjectId : string;
  public imageString: String;
  uploading: boolean = false;
  notice: Notice = {
    title: '',
    description:'',
    image:''
  };
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

  //  this.getNotice(this.selectedObjectId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("hello");
    console.log("check "+ this.selectedObjectId);
    this.getNotice(this.selectedObjectId);
    this.noticeForm.disable();

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

  setFormData(){
    console.log("title "+ this.notice.title);
    this.noticeForm.controls.title.setValue(this.notice.title);
    this.noticeForm.controls.description.setValue(this.notice.description);
  }

  getNoticeList() {
    this.noticeService.getNotices()
      .subscribe(notices => {
        this.notices = notices;
        this.finalNoticeList = notices;
      });
  }

  getNotice(id:string){
    this.noticeService.getNotice(id)
      .subscribe(notice => {
        this.noticeForm.controls.title.setValue(notice.title);
        this.noticeForm.controls.description.setValue(notice.description);
      });

  }



}
