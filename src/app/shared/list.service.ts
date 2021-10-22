import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../model/list';
import { BehaviorSubject, Observable } from 'rxjs';
import { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';

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
  
  getListbyId(id:string){
    return this.http.get<TodoList>(this.productsUrl+"/"+id);
  }

  getListbyUser(id:string[]){
    return this.http.post<TodoList[]>(this.productsUrl+'/listforuser',id);
  }

  editList(id:string,obj:any):Observable<any>{
    return this.http.put<TodoList[]>(this.productsUrl+"/"+id,obj);
  }

  deletebyId(id:string){
    return this.http.delete<TodoList>(this.productsUrl+"/"+id);
  }
 
}
