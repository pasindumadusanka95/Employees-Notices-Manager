import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpUrls} from '../utils/http-urls.enum';
import {Observable} from "rxjs";
import {Notice} from "../../shared/models/notice";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private httpClient : HttpClient) { }

  getNotices() : Observable<any>{
    return this.httpClient.get(HttpUrls.get_all_notice);
  }

  addNotices(notice : Notice) {
    return this.httpClient.post(HttpUrls.add_notice,notice,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  deleteNotice(id: number){
    return this.httpClient.delete(HttpUrls.delete_notice + `/${id}`);
  }
}
