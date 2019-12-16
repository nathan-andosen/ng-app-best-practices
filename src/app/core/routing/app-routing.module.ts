import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '../../features/home/home.module#HomeModule',
    data: {
      name: 'home'
    }
  },
  {
    path: 'users',
    loadChildren: '../../features/users/users.module#UsersModule',
    data: {
      name: 'users'
    }
  },
  {
    path: 'performance',
    loadChildren: '../../features/performance/performance.module#PerformanceModule',
    data: {
      name: 'performance'
    }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
