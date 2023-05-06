import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CpuComponent } from './components/cpu/cpu.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { GpuComponent } from './components/gpu/gpu.component';
import { NavbarModule } from "../shared/modules/navbar/navbar.module";


const routes = [
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cpu',
    component: CpuComponent
  },
  
  {
    path: 'gpu',
    component: GpuComponent
  },

]

@NgModule({
    declarations: [
        CategoryComponent,
        CpuComponent,
        GpuComponent
    ],
    providers: [
        AuthGuard
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        NavbarModule
    ]
})
export class ForgeModule { }
