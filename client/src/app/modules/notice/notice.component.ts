import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {Notice} from "../../shared/models/notice";
import {NoticeService} from "../../core/services/notice.service";
import {SnackBarComponent} from "../../shared/popup-modals/snack-bar/snack-bar.component";
import {not} from "rxjs/internal-compatibility";
import {CustomWarningModalComponent} from "../../shared/popup-modals/custom-warning-modal/custom-warning-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
  providers : [NoticeService]
})
export class NoticeComponent implements OnInit, OnChanges {
  imageURL: string;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  @Input('objectId') selectedObjectId : string;

  public imageString: String;
  isEdit : boolean = false;
  isDelete : boolean = false;
  isContent : boolean = true;
  isChange : boolean = false;
  isUser : boolean =false;
  isAdmin : boolean = false;
  uploading: boolean = false;
  title : string = "";
  description : string = "";
  notice: Notice ;
  notices: Notice[];
  finalNoticeList: Notice[] = [];
  noticeForm = new FormGroup({
    image: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    avatar : new FormControl(null),
  });

  constructor(private noticeService: NoticeService, private customPopup : SnackBarComponent, private dialog : MatDialog
               , private router: Router) {
  }

  ngOnInit(): void {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.customPopup.openSnackBar("Image Uploaded Successful",'success')
    };

    const token = JSON.parse(localStorage.getItem('user'));

    if(token.role == 'User'){
      this.isUser = true;
    }
    if(token.role == 'Admin'){
      this.isAdmin = true;
    }


    this.getNoticeList();
    this.refreshComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("hello");
    console.log("check "+ this.selectedObjectId);
    this.getNotice(this.selectedObjectId);
    this.noticeForm.disable();


  }

  deleteNotice() {
    let dialogRefDelete: any;
    dialogRefDelete = this.dialog.open(CustomWarningModalComponent, {
      width: '400px',
      data: {
        save: true,
        no: false,
        message: 'Are you sure you want to delete this notice?'
      }
    });

    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.isChange = true;
        this.noticeService.deleteNotice(this.selectedObjectId).subscribe(data => {
          this.customPopup.openSnackBar("Notice Deleted Successfully!","delete")
        });
        this.isDelete =true;
      }
    });

  }

  addNotice(){
    let newNotice = new Notice();
    newNotice.title = this.noticeForm.controls.title.value;
    newNotice.description = this.noticeForm.controls.description.value;
    newNotice.image = "test";
    if(this.isEdit){
      let dialogRefEdit: any;
      dialogRefEdit = this.dialog.open(CustomWarningModalComponent, {
        width: '400px',
        data: {
          save: true,
          no: false,
          message: 'Are you sure you want to update this notice?'
        }
      });

      dialogRefEdit.afterClosed().subscribe(result => {
        if (result) {
          this.title = this.noticeForm.controls.title.value;
          this.description = this.noticeForm.controls.description.value;
          this.noticeService.updateNotice(this.selectedObjectId,newNotice).subscribe(notice=>{
            this.isChange = true;
            this.customPopup.openSnackBar("Notice Updated Successfully!","warning")
            this.getNoticeList();
          },error => {
            console.log(error);
          });
        }
      });

      this.isEdit = false;
      this.isContent = true;
    }
    else{
      let dialogRefSave: any;
      dialogRefSave = this.dialog.open(CustomWarningModalComponent, {
        width: '400px',
        data: {
          save: true,
          no: false,
          message: 'Are you sure you want to save this notice?'
        }
      });

      dialogRefSave.afterClosed().subscribe(result => {
        if (result) {
          this.noticeService.addNotices(newNotice).subscribe(notice=>{
            this.customPopup.openSnackBar("Notice Saved Successfully!","success")
            this.getNoticeList();
          },error => {
            console.log(error);
          });
        }
      });

    }
    this.noticeForm.disable();

  }

  setToEdit(){

    this.noticeForm.enable();
    this.isEdit =true;
    this.isContent = false;
  }


  setFormData(){
    console.log("title "+ this.notice.title);
    this.noticeForm.controls.title.setValue(this.notice.title);
    this.noticeForm.controls.description.setValue(this.notice.description);
  }

  getNoticeList() {
    this.noticeService.getNotices()
      .subscribe(notices => {
        console.log(notices);
        this.notices = notices;
        this.finalNoticeList = notices;
      });
  }

  getNotice(id:string){
    this.noticeService.getNotice(id)
      .subscribe(notice => {
        if(notice){
          this.title = notice.title;
          this.description = notice.description;
          this.noticeForm.controls.title.setValue(notice.title);
          this.noticeForm.controls.description.setValue(notice.description);
        }

      });

  }

  setState(){
    this.noticeForm.disable();
    if(this.isChange){
      window.location.reload();
    }
    this.isEdit = false;
    this.isContent = true;
   // window.location.reload();
  }

  refreshComponent() {
    this.router.navigateByUrl('/main', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/main']);
    });
  }

  // Image Preview
  showNoticePreview(event) {

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
