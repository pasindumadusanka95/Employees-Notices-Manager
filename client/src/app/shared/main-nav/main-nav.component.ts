import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../core/services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {EditProfileComponent} from '../../modules/edit-profile/edit-profile.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  public image: string;
  constructor(private authenticationService: AuthenticationService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
  }

  editProfile() {
    let dialogRef: any;
    dialogRef = this.dialog.open(EditProfileComponent, {
      width: '800px',
      maxHeight: '800px',
      data: {
        yes: false,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
