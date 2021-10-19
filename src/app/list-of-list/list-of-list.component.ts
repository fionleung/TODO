import { Component, OnInit } from '@angular/core';
import { ListService } from '../shared/list.service';
import { TodoList } from '../model/list';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-of-list',
  templateUrl: './list-of-list.component.html',
  styleUrls: ['./list-of-list.component.scss']
})
export class ListOfListComponent implements OnInit {
  lists$!: Observable<TodoList[]>;

  constructor(private listService:ListService) { }

  ngOnInit(): void {
    this.lists$ = this.listService.getList();
  }

}
