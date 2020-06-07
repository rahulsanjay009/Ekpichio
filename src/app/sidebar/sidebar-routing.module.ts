import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarPage } from './sidebar.page';


const routes: Routes = [
  {
    path: '',
    component: SidebarPage
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidebarPageRoutingModule {}
