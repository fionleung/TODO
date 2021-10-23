import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../shared/list.service';
import { TodoList } from '../model/list';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { UserService } from '../shared/user.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list-of-list',
  templateUrl: './list-of-list.component.html',
  styleUrls: ['./list-of-list.component.scss']
})
export class ListOfListComponent implements OnInit {
 // tags: string[] =[];
  tagOptions: string[]=[];
  selectedTags:string[]=[];
  search=new FormControl();
  $serchtag = new Subject();
  user = localStorage.getItem('TodoUserId')+"";
  wholelist:TodoList[] = [];
  displayedColumns: string[] = ['title', 'tags', 'progress'];
  dataSource = new MatTableDataSource<TodoList>();
  allTagsMap =new Map<string, string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(private listService:ListService,private userService:UserService,private router:Router) {  
   this.userService.getListbyUserId(this.user).pipe(
     switchMap((res) =>{
       return this.listService.getListbyUser(res);
     })
   ).subscribe(res=>{
     this.wholelist = res;
    this.dataSource.data = res;
    this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
   });

   this.userService.getTags(this.user).subscribe(res => {
    // this.tags = res;
     this.tagOptions = res;
     res.forEach((tag:string,i:number) => { 
       this.userService.addOneColor();
       this.allTagsMap.set(tag,this.userService.color[i]);
      })
   });
   }

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
     ).subscribe(
       res => {
        this.getSearchResult(res,this.selectedTags);
        }
     );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  navigate(row:any){
    this.router.navigate(['lists/listdetail/',row._id]);
  }

  round(num:number){
    return Math.floor(num);
  }

  addTag(tag:string){
   this.selectedTags.push(tag);
   this.tagOptions = this.tagOptions.filter( x => x!=tag);
   this.getSearchResult(this.search.value,this.selectedTags);
   
  }

  removeTag(tag:string){
    this.tagOptions.push(tag);
    this.selectedTags = this.selectedTags.filter( x => x!=tag);
    this.getSearchResult(this.search.value,this.selectedTags);
  }

  OnEnter(){
    this.getSearchResult(this.search.value,this.selectedTags);
  }

  getSearchResult(title:string,tags:string[]){
    let searchresult = this.wholelist;
    if(title){
    searchresult = this.wholelist.filter(x =>(x.title).toLowerCase().includes(title));}
    if(tags.length>0){
      searchresult = searchresult.filter(x => {
       return this.hasDuplicate(x.tags,tags);
      });
    }
    this.dataSource.data = searchresult;
    this.dataSource.paginator = this.paginator;
  }

  hasDuplicate(a:string[],b:string[]){
    // for(let elea of a)
    //    for(let eleb of b)
    //    if(elea===eleb){
    //     return true;
    //    }
    let obj=new Map();
        for (let i = 0; i < a.length; i++) {
                obj.set(a[i],true);
        }
        for (let j = 0; j < b.length ; j++) {
        if(obj.get(b[j])) {
            return true;
        }
    }
       return false;
  }
}


//todo:search by tags, responsive table