import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { DevelopmentRoutingModule } from './develompent-routing.module';
import { ToasterModule } from '../../components/toaster/toaster.module';

import { ControlPanelComponent } from './control-panel/control-panel.component';

@NgModule({
  imports: [
    CommonModule,
    DevelopmentRoutingModule,
    ToasterModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [ControlPanelComponent]
})
export class DevelopmentModule { }
