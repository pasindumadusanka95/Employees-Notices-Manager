import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {FullPageLoaderService} from '../../../core/services/full-page-loader.service';

@Component({
  selector: 'app-full-page-loader',
  templateUrl: './full-page-loader.component.html',
  styleUrls: ['./full-page-loader.component.css']
})
export class FullPageLoaderComponent implements OnInit {
  color = 'accent';
  mode = 'indeterminate';
  value = 100;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: FullPageLoaderService) { }

  ngOnInit(): void {
  }

}
