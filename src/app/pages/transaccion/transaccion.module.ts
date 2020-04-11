import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransaccionPageRoutingModule } from './transaccion-routing.module';

import { TransaccionPage } from './transaccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransaccionPageRoutingModule
  ],
  declarations: [TransaccionPage]
})
export class TransaccionPageModule {}
