import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsRoutingModule } from './incriptions-routing.module';
import { InscrptionsComponent } from './inscrptions.component';



@NgModule({
  declarations: [
    InscrptionsComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule
  ]
})
export class InscrptionsModule { }
