import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzFormModule,
  NzIconModule,
  NzInputModule, NzPageHeaderModule,
  NzSliderModule, NzTableModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import { ChromecastPageComponent } from './chromecast-page/chromecast-page.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ChromecastPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NzSliderModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    NzCardModule,
    NzTypographyModule,
    NzTableModule,
    NzAvatarModule,
    NzPageHeaderModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
