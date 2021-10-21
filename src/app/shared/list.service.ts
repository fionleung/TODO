import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../model/list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private productsUrl = '/api/list';
  constructor(private http: HttpClient) { }
 
  getList(){
    return this.http.get<TodoList[]>(this.productsUrl)
  }

  addList(obj:any):Observable<any>{
    return this.http.post<TodoList[]>(this.productsUrl,obj);
  }
  
 

   
}
