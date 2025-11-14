import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistryRoutingModule } from './registry-routing.module';
import { RegistryComponent } from './registry.component';
import { ModalModule } from '../../modal/modal.module';
import { ModalComponent } from '../../modal/modal.component';

@NgModule({
  declarations: [ RegistryComponent ],
  imports: [
    CommonModule,
    RegistryRoutingModule,
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
export class RegistryModule {
}
