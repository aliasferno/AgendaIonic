import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AperfilPage } from './aperfil.page';

const routes: Routes = [
  {
    path: '',
    component: AperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AperfilPageRoutingModule {}
