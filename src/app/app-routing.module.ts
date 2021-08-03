import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { Page404Component } from './page404/page404.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [


{path:'', component:UserComponent},
{path:'calculadora', component:CalculadoraComponent},
{path:'**', component:Page404Component}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
