import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PackageRoutingModule } from './package-routing.module';
import { PackageComponent } from './package.component';
import { ModalModule } from '../../modal/modal.module';
import { ModalComponent } from '../../modal/modal.component';

@NgModule({
  declarations: [ PackageComponent ],
  imports: [
    CommonModule,
    PackageRoutingModule,
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
export class PackageModule {
}
