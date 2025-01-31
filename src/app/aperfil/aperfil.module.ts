import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AperfilPageRoutingModule } from './aperfil-routing.module';

import { AperfilPage } from './aperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AperfilPageRoutingModule
  ],
  declarations: [AperfilPage]
})
export class AperfilPageModule {}
