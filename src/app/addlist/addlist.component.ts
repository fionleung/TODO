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
import { Router } from '@angular/router';


export interface taskinput{
  content :string,
    assignTo : string[],
    idx:number,
}

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.scss'],
 // encapsulation: ViewEncapsulation.None
})
export class AddlistComponent implements OnInit {
  user = localStorage.getItem('TodoUserId')+"";
  //for title
  title = new FormControl('', [Validators.required]);
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
  }];
  @ViewChild(MatTable) table!: MatTable<taskinput>;

  displayedColumns: string[] = ['task-content', 'task-person', 'task-remove'];
  

  constructor(private fb:FormBuilder, 
    private listservice:ListService, 
    private userservice:UserService,
    private router:Router) { 
    //for tag
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    //for task
     
  }

  ngOnInit(): void {
   this.userservice.getTags(this.user).subscribe(res=>{
     this.allTags=res;
    });
   
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
    idx:++this.idx
  }];
  this.table.renderRows();
}

removeTask(idx:number){
this.dataSource = this.dataSource.filter(task => task.idx!= idx);
this.table.renderRows();
}

submit(){
  this.tags = this.tags.map(x=>x.toUpperCase());
  this.tags= this.tags.reduce((prev:string[],cur)=>{
      if (!prev.includes(cur)) 
      prev.push(cur); 
      return prev;
    },[]);
  let tasklist = this.dataSource.reduce((acc:Task[],cur) => {
     if(cur.content.length>0){
       let newitem:Task={
        creator : this.user,
        createdTime : new Date(),
        content : cur.content,
        assignTo : cur.assignTo,
        done : false,
        history:[]
        }
       return [...acc,newitem];
     }
      return acc;
   },[]);  
   let newlist: TodoList ={
    createTime: new Date(),
    creator: this.user,
    sharewith:this.people,
    title:this.title.value,
    tasks:tasklist,
    tags:this.tags,
    tasksnum:tasklist.length,
    taskdone:0,
    deadline:this.deadline
   }
    let newtags = this.allTags.concat(this.tags.filter((item) => this.allTags.indexOf(item) < 0));
   this.userservice.addTags(this.user,newtags).subscribe(res=>{});
   if (this.deadline) newlist.deadline=this.deadline;
   this.listservice.addList(newlist).subscribe(res =>{
     this.router.navigate(['/lists']);
    });
  
   
   
}
}
