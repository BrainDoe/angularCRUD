import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://localhost:3000/posts";

  constructor(private httpclient: HttpClient) { }

  postEmployee(data: any){
    return this.httpclient.post<any>(this.apiUrl, data, httpOptions)
    .pipe(map((res:any) => res));
  }

  getEmployee(){
    return this.httpclient.get<any>(this.apiUrl)
    .pipe(map((res:any) => res));
  }

  updateEmployee(data: any, id: any){
    let url = `${this.apiUrl}/${id}`;
    return this.httpclient.put<any>(url, data, httpOptions)
    .pipe(map((res:any) => res));
  }

  deleteEmployee(id: any){
    let url = `${this.apiUrl}/${id}`;
    return this.httpclient.delete<any>(url)
    .pipe(map((res:any) => res));
  }
  
}
