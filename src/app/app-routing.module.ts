import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'transacciones',
    loadChildren: () => import('./pages/transacciones/transacciones.module').then( m => m.TransaccionesPageModule)
  },
  {
    path: 'transaccion',
    loadChildren: () => import('./pages/transaccion/transaccion.module').then( m => m.TransaccionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
