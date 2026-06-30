import {provideHttpClient } from '@angular/common/http';
import { NgModule , provideBrowserGlobalErrorListeners } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing/app-routing-module';
import {AppComponent} from "../app";
import { HomeComponent } from '../home/home';
import { LoginComponent } from '../login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Dashboard} from '../dashboard/dashboard';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,    
  ],
  providers: [
    provideHttpClient(),provideBrowserGlobalErrorListeners()
  ]
})
export class AppModuleModule { }
