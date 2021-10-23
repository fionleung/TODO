import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
    { path: ':id', component: ListComponent }];

@NgModule({
  declarations: [ListComponent],
  imports: [RouterModule.forChild(routes), 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
    
],
})
export class DetailModule {}

