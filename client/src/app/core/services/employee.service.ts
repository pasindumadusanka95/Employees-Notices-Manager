import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpUrls} from "../utils/http-urls.enum";
import {Employee} from "../../shared/models/employee";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private httpClient : HttpClient) { }


  getEmployee(id : string) : Observable<any>{
    return this.httpClient.get(HttpUrls.get_a_employee+ `/${id}`)
  }

  updateEmployee(id : string, employee :Employee){
    return this.httpClient.put(HttpUrls.update_employee + `/${id}`,employee,{
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

}
