import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { NavigationBarRowDirective } from './navigation-bar-row.directive';
import { NavigationButtonComponent } from './navigation-button/navigation-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavigationBarComponent,
    NavigationButtonComponent,
    NavigationBarRowDirective
  ],
  exports: [
    NavigationBarComponent,
    NavigationButtonComponent
  ]
})
export class NavigationBarModule { }
