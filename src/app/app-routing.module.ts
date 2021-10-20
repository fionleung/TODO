import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListOfListComponent } from './list-of-list/list-of-list.component';
import { notificationComponent } from './notification/notification.component';
import { AddlistComponent } from './addlist/addlist.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'lists', component: ListOfListComponent },
  { path: 'notification', component: notificationComponent},
  { path: 'addlist', component: AddlistComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
