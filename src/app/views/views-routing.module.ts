import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../layouts/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
      {
        path: 'package',
        loadChildren: () => import('./package/package.module').then(m => m.PackageModule)
      },
      {
        path: 'place',
        loadChildren: () => import('./place/place.module').then(m => m.PlaceModule)
      },
      {
        path: 'transport',
        loadChildren: () => import('./transport/transport.module').then(m => m.TransportModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'registry',
        loadChildren: () => import('./registry/registry.module').then(m => m.RegistryModule)
      },
      {
        path: 'shipping',
        loadChildren: () => import('./shipping/shipping.module').then(m => m.ShippingModule)
      }
    ] 
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule {
}
