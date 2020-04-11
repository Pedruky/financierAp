import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionPage } from './transaccion.page';

const routes: Routes = [
  {
    path: '',
    component: TransaccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransaccionPageRoutingModule {}
