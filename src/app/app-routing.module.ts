import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChromecastPageComponent} from './chromecast-page/chromecast-page.component';

const routes: Routes = [
  { path: '**', component: ChromecastPageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
