import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../model/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private productsUrl = '/api/list';
  constructor(private http: HttpClient) { }
 
  getList(){
    return this.http.get<TodoList[]>(this.productsUrl);
  }
  
}
