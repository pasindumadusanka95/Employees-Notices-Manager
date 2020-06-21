import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-warning-modal',
  templateUrl: './custom-warning-modal.component.html',
  styleUrls: ['./custom-warning-modal.component.css']
})
export class CustomWarningModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
