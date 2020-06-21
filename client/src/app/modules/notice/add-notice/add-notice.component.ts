import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Notice} from "../../../shared/models/notice";
import {NoticeService} from "../../../core/services/notice.service";
import {SnackBarComponent} from "../../../shared/popup-modals/snack-bar/snack-bar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {
  noticeForm = new FormGroup({
    image: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),

  });
  constructor(private noticeService : NoticeService, private  customPopup : SnackBarComponent,private router: Router) { }

  ngOnInit(): void {

  }
  addNotice(){
    let newNotice = new Notice();
    newNotice.title = this.noticeForm.controls.title.value;
    newNotice.description = this.noticeForm.controls.description.value;
    newNotice.image = "test";

      this.noticeService.addNotices(newNotice).subscribe(notice=>{
        this.customPopup.openSnackBar("Notice Saved Successfully!","success")

      },error => {
        console.log(error);
      });
    this.refreshComponent();
  }

  refreshComponent() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/']);
    });
  }
}
