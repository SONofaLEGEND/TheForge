import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from "../shared/modules/navbar/navbar.module";

const routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NavbarModule
    ]
})
export class HomeModule { }
