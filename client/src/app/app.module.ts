import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticeComponent } from './modules/notice/notice.component';
import { NoticeListComponent } from './modules/notice-list/notice-list.component';
import { FullPageLoaderComponent } from './shared/loaders/full-page-loader/full-page-loader.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FullPageLoaderService} from "./core/services/full-page-loader.service";
import {FullPageLoaderInterceptor} from "./core/interceptors/full-page-loader.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    AppComponent,
    NoticeComponent,
    NoticeListComponent,
    FullPageLoaderComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatStepperModule,

  ],
  providers: [
    FullPageLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: FullPageLoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
