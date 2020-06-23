import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {FullPageLoaderService} from '../services/full-page-loader.service';

@Injectable()

export class FullPageLoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: FullPageLoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method !== 'GET') {
      this.loaderService.show();
    }
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

}
