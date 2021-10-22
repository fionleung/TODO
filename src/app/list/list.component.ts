import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Task } from '../model/task';
import {MatTable} from '@angular/material/table';
import { TodoList } from '../model/list';
import { ListService } from '../shared/list.service';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface taskinput{
  content :string,
    assignTo : string[],
    idx:Number,
    done:Boolean
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  id = "";
  list!: TodoList;
  user = localStorage.getItem('TodoUserId')+"";
  //for title
  titlectrl = new FormControl('', [Validators.required]);
  //for tag
  tagOp!: Observable<string[]>;
 separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  tagoptions: string[] = ['One', 'Two', 'Three'];
  filteredTags!: Observable<string[]>;
  tags: string[] = [];
  allTags: string[]=[];
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  //for share with
  peopleCtrl =  new FormControl('', [Validators.email]);
  people: string[] = [];
  //for date
  deadline:Date | undefined;
  //for tasklist
  idx =0;
  dataSource:taskinput[]=[{
    content :"",
    assignTo : [""],
    idx:0,
    done:true,
  }];
  @ViewChild(MatTable) table!: MatTable<taskinput>;
 displayedColumns: string[] = ["done",'task-content', 'task-person', 'task-remove'];
  
 constructor(private listservice:ListService, 
              private userservice:UserService,
              private activeRoute:ActivatedRoute, 
             private router:Router) {
 
  this.id = this.activeRoute.snapshot.paramMap.get('id') || "";
  this.listservice.getListbyId(this.id).subscribe(res=>{
    this.list = res;
    this.titlectrl.setValue(this.list.title);
    this.tags=this.list.tags;
   // this.people=this.list.sharewith;
    this.deadline=this.list.deadline;
    if(this.list._id) this.id=this.list._id;
    if(this.list.tasks && this.list.tasks.length>0) {
      this.dataSource = [];
      this.list.tasks.forEach((task,i) =>{
        this.dataSource.push({
          content :task.content,
          assignTo :task.assignTo,
          idx:i,
          done:task.done
        })
      })
    }
  })
 
   

   
     
   }

  
   ngOnInit(): void {
    this.userservice.getTags(this.user).subscribe(res=>{this.allTags=res});
   } 
 
 
 //for tags
   add(event: MatChipInputEvent,arr:string[],ctrl:FormControl): void {
     if(ctrl.valid){
       const value = (event.value || '').trim();
       if (value) {
         arr.push(value);
       }
       event.chipInput!.clear();
       ctrl.setValue(null);
     }
   }
 
   remove(tag: string,arr:string[]): void {
     const index = arr.indexOf(tag);
     if (index >= 0) {
       arr.splice(index, 1);
     }
   }
 
   selected(event: MatAutocompleteSelectedEvent): void {
     this.tags.push(event.option.viewValue.toUpperCase());
     this.tagInput.nativeElement.value = '';
     this.tagCtrl.setValue(null);
   }
 
   private _filter(value: string): string[] {
     const filterValue = value.toUpperCase();
     return this.allTags.filter(tag => tag.toUpperCase().includes(filterValue));
   }
  
   //for date
   onChange(newValue:Date) {
     this.deadline = newValue;  
 }
 
 //for tasks
 addTask(){
   this.dataSource =[...this.dataSource,{
     content : "",
     assignTo : [""],
     idx:++this.idx,
     done:false,
   }];
   this.table.renderRows();
 }
 
 removeTask(idx:number){
 this.dataSource = this.dataSource.filter(task => task.idx!= idx);
 this.table.renderRows();
 }
 
 update(){ 
  let taskdonecount = 0;
   let tasklist = this.dataSource.reduce((acc:Task[],cur) => {
   
      if(cur.content.length>0){
        let newitem:Task={
         creator : this.user,
         createdTime : new Date(),
         content : cur.content,
         assignTo : cur.assignTo,
         done : cur.done,
         history:[]
         }
         if(cur.done) taskdonecount++;
        return [...acc,newitem];
      }
       return acc;
    },[]);  
    let newlist: TodoList ={
     createTime: new Date(),
     creator: this.user,
     sharewith:this.people,
     title:this.titlectrl.value,
     tasks:tasklist,
     tags:this.tags,
     tasksnum:tasklist.length,
     taskdone:taskdonecount
    }
    let newtags = this.allTags.concat(this.tags.filter((item) => this.allTags.indexOf(item) < 0))
    this.userservice.addTags(this.user,newtags).subscribe(res=>{});
    if (this.deadline) newlist.deadline=this.deadline;
    this.listservice.editList(this.id,newlist).subscribe(res =>{
      this.router.navigate(['/lists']);
    });
    //todo:catch error
 }

 delete(){
   this.listservice.deletebyId(this.id).subscribe(res =>{
    this.router.navigate(['/lists']);
     //todo:add comfirm ui
  });
 }


 }
 
 //todo: move tag color to db