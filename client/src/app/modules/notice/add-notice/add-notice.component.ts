import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Notice} from "../../../shared/models/notice";
import {NoticeService} from "../../../core/services/notice.service";
import {SnackBarComponent} from "../../../shared/popup-modals/snack-bar/snack-bar.component";
import {Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";
const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {

  imageURL: string;

  noticeForm = new FormGroup({
    image: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),

  });


  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  constructor(private noticeService : NoticeService, private  customPopup : SnackBarComponent,private router: Router) { }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.customPopup.openSnackBar("Image Uploaded Successful",'success')
    };
  }
  addNotice(){
    let newNotice = new Notice();
    newNotice.title = this.noticeForm.controls.title.value;
    newNotice.description = this.noticeForm.controls.description.value;
    newNotice.image = "test";

      this.noticeService.addNotices(newNotice).subscribe(notice=>{
        this.customPopup.openSnackBar("Notice Saved Successfully!","success")
        window.location.reload();
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

  // Image Preview
  showPreview(event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.noticeForm.patchValue({
      avatar: file
    });
    this.noticeForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
