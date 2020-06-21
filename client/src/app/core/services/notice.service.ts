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
  getNotice(id : string) : Observable<any>{
    return this.httpClient.get(HttpUrls.get_a_notice+ `/${id}`)
  }

  addNotices(notice : Notice) {
    return this.httpClient.post(HttpUrls.add_notice,notice,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  updateNotice(id : string, notice :Notice){
    return this.httpClient.put(HttpUrls.update_notice+ `/${id}`,notice,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  deleteNotice(id: string){
    return this.httpClient.delete(HttpUrls.delete_notice + `/${id}`);
  }
}
