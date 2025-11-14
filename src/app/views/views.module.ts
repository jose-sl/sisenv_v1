import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewsRoutingModule } from './views-routing.module';
import { HomeComponent } from '../layouts/home/home.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule  
  ],
  exports: [
  ]
})
export class ViewsModule {
}
