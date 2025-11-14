import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceComponent } from './place.component';
import { ModalModule } from '../../modal/modal.module';
import { ModalComponent } from '../../modal/modal.component';

@NgModule({
  declarations: [ PlaceComponent ],
  imports: [
    CommonModule,
    PlaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule
  ],
  entryComponents: [
    ModalComponent
  ],
  exports: [
  ]
})
export class PlaceModule {
}
