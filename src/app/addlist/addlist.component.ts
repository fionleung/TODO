import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Task } from '../model/task';
import {MatTable} from '@angular/material/table';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

export interface taskinput{
  content :string,
    assignTo : string[],
    idx:number
}

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.scss'],
 // encapsulation: ViewEncapsulation.None
})
export class AddlistComponent implements OnInit {
  //for title
  title = new FormControl('', [Validators.required]);
  //for tag
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  tagoptions: string[] = ['One', 'Two', 'Three'];
  filteredTags!: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
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
  

  constructor(private fb:FormBuilder) { 
    //for tag
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    //for task
     
  }

  ngOnInit(): void {
   
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
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
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
console.log(this.dataSource);
}

submit(){
  let tasklist = this.dataSource.reduce((acc:Task[],cur) => {
     if(cur.content.length>0){
       let newitem:Task={
        creator : "user",
        createdTime : new Date(),
        content : cur.content,
        assignTo : cur.assignTo,
        status : "NEW",
        history:[]
        }
       return [...acc,newitem];
     }
      return acc;
   },[]);  
   console.log(tasklist);
}
}
