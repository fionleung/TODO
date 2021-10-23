import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfListComponent } from './list-of-list/list-of-list.component';
import { notificationComponent } from './notification/notification.component';
import { AddlistComponent } from './addlist/addlist.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { NavComponent } from './nav/nav.component';



const routes: Routes = [
  { path: '', redirectTo:"lists", pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'lists', canActivate: [ AuthGuard ],component: NavComponent,children:[
    { path: '', component: ListOfListComponent},
    { path: 'notification', component: notificationComponent},
    { path: 'addlist',canActivate: [ AuthGuard ],component: AddlistComponent },
    { path: 'listdetail', loadChildren: () => import('./list/detail.module').then((m) => m.DetailModule)}
  ] }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
