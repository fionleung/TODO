import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../shared/list.service';
import { TodoList } from '../model/list';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { UserService } from '../shared/user.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-of-list',
  templateUrl: './list-of-list.component.html',
  styleUrls: ['./list-of-list.component.scss']
})
export class ListOfListComponent implements OnInit {
  user = localStorage.getItem('TodoUserId')+"";
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
    this.dataSource.data = res;
    this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
   });

   this.userService.getTags(this.user).subscribe(res => {
     res.forEach((tag:string) => { this.allTagsMap.set(tag,this.getRandomColor())})
   });
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  navigate(row:any){
   
    this.router.navigate(['/listdetail',row._id]);
  }

  round(num:number){
    return Math.floor(num);
  }
}

//todo:search by tags, responsive table