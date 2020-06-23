import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../core/services/employee.service";
import {Notice} from "../../shared/models/notice";
import {HttpUrls} from "../../core/utils/http-urls.enum";
import {Employee} from "../../shared/models/employee";
import {SnackBarComponent} from "../../shared/popup-modals/snack-bar/snack-bar.component";
import {FileUploader} from "ng2-file-upload";

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  imageURL: string;
  isSave : boolean = false;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  token : any;
  loggedObjectId : string;

  isEdit : boolean = false;
  employeeForm = new FormGroup({
    name: new FormControl(),
    age: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required]),
    avatar : new FormControl()
  });

  constructor(private employeeService : EmployeeService, private customPopup : SnackBarComponent) { }

  ngOnInit(): void {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.customPopup.openSnackBar("Image Uploaded Successful",'success')
    };

    this.employeeForm.disable();
     this.token = JSON.parse(localStorage.getItem('user'));

    this.getEmployee(this.token.id);
  }

  getEmployee(id:string){
    this.employeeService.getEmployee(id)
      .subscribe(employee => {
        this.loggedObjectId = employee[0]._id;
        this.employeeForm.controls.name.setValue(employee[0].name);
        this.employeeForm.controls.age.setValue(employee[0].age);
        this.employeeForm.controls.address.setValue(employee[0].address);
        this.employeeForm.controls.gender.setValue(employee[0].gender);
        this.employeeForm.controls.phoneNo.setValue(employee[0].phoneNo);
      });

  }

  updateEmployee(){
    let newEmployee = new Employee();
    newEmployee.name = this.employeeForm.controls.name.value;
    newEmployee.age = this.employeeForm.controls.age.value;
    newEmployee.gender = this.employeeForm.controls.gender.value;
    newEmployee.address = this.employeeForm.controls.address.value;
    newEmployee.phoneNo = this.employeeForm.controls.phoneNo.value;
    newEmployee.profilePic = "test";

      this.employeeService.updateEmployee(this.loggedObjectId,newEmployee).subscribe(notice=>{
        this.customPopup.openSnackBar("Profile Updated Successfully!","warning");
        this.isSave = true;
      },error => {
        console.log(error);
      });
      this.isEdit = false;

    this.employeeForm.disable();

  }

  setEdit(){
    this.employeeForm.enable();
    this.isEdit = true;
    this.isSave = false;
  }



  showProfilePreview(event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.employeeForm.patchValue({
      avatar: file
    });
    this.employeeForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
