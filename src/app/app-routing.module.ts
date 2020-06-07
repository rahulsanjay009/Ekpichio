import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sidebar/home',
    pathMatch: 'full'
  },
  {
    path: 'sidebar/:id',
    loadChildren: () => import('./sidebar/sidebar.module').then( m => m.SidebarPageModule)
  },
  {
    path:'register',
    loadChildren: () => import ('./sidebar/register/register.module').then(m=>m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
