import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/authentication.service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  public image: String;
  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
  }
}
