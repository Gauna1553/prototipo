import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { RutinasComponent } from './modules/rutinas/rutinas.component';
import { EjerciciosComponent } from './modules/ejercicios/ejercicios.component';
import { HomeComponent } from './modules/home/home.component';
import { ConcepinfComponent } from './modules/concepinf/concepinf.component';

const routes: Routes = [
   //lazyloading
  {path: "auth",
  loadChildren:()=>import('./modules/auth/auth.module').then(m =>m.AuthModule)},{
  path: '', component: HomeComponent},{   //ruta de home
  path: '', loadChildren:()=>import('./modules/perfil/perfil.module').then(m=>m.PerfilModule)},{   //ruta de perfil
  path: 'rutinas', component: RutinasComponent},{   //ruta de rutinas
  path: '', loadChildren:()=>import('./modules/ejercicios/ejercicios.module').then(m=>m.EjerciciosModule)},{   //ruta de ejercicios
  //path: 'crear', component: CrearrutinasComponent},{   //ruta de crearrutinas
  path: 'conceps', component:ConcepinfComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
