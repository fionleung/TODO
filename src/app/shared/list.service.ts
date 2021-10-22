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
  curList= new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }
 
  getList(){
    return this.http.get<TodoList[]>(this.productsUrl)
  }

  addList(obj:any):Observable<any>{
    return this.http.post<TodoList[]>(this.productsUrl,obj);
  }
  
  getListbyId(id:string){
    return this.http.get<TodoList[]>(this.productsUrl+id);
  }

  getListbyUser(id:String[]){
    return this.http.post<TodoList[]>(this.productsUrl+'/listforuser',id);
  }

  editList(id:String,obj:any):Observable<any>{
    return this.http.put<TodoList[]>(this.productsUrl+"/"+id,obj);
  }
 
}
