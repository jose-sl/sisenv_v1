import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import { ModalModule } from '../../modal/modal.module';
import { ModalComponent } from '../../modal/modal.component';

@NgModule({
  declarations: [ TransportComponent ],
  imports: [
    CommonModule,
    TransportRoutingModule,
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
export class TransportModule {
}
