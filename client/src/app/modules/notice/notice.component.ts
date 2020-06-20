import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  public imageString: String;

  noticeForm = new FormGroup({
    _id: new FormControl(),
    image: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),

  });
  constructor() { }

  ngOnInit(): void {
  }

}
