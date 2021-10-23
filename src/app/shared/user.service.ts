import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import {  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  color:string[] =[];
  constructor(private http: HttpClient) {
   }

  createNewUser(payload:User):Observable<any> {
    return this.http.post(`/api/user/register`, payload);
  }

  login(payload:User):Observable<any> {
    return this.http.post(`/api/user/login`, payload);
  }

  setUserDate(data:any){
    localStorage.setItem('TodoToken', data.token);
    localStorage.setItem('TodoUserName', data.userCredentials.name);
    localStorage.setItem('TodoUserId', data.userCredentials._id);
  }

  getTags(id:string):Observable<any>{
    return this.http.get<string[]>('/api/user/'+id+'/tags');
  }

  addTags(id:string,payload:string[]):Observable<any>{
    return this.http.post('/api/user/'+id+'/tags',payload);
  }

  getListbyUserId(id:any):Observable<string[]>{
    return this.http.get<string[]>("/api/user/"+id+"/lists");
  }
 

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addOneColor(){
    this.color.push(this.getRandomColor());
  }
  
}


