import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import {  Observable } from 'rxjs';
import jwt_decode from "jwt-decode"
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  color:string[] =[];
  curUser= {
    role:"",
    id:"",
  };
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
  }

  decodeToken(){
     let token= localStorage.getItem('TodoToken');
     if(token){
      let obj:any=jwt_decode(token);
       this.curUser ={
          role:obj.role,
           id:obj.id
       };
     }
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


