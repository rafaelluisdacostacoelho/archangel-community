import 'hammerjs';

import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AppRoutingModule } from './app-routing.module';

import { NavigationBarModule } from './components/navigation-bar/navigation-bar.module';
import { MarketModule } from './modules/market/market.module';
import { SecurityModule } from './modules/security/security.module';
import { DevelopmentModule } from './modules/development';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { BackendMockProvider } from './back-end.mock-provider';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MarketModule,
    AppRoutingModule,
    NavigationBarModule,
    SecurityModule,
    DevelopmentModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent
  ],
  providers: [
    BaseRequestOptions,
    MockBackend,
    BackendMockProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
