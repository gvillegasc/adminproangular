// Encargado para menjar las rutas
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Guards
import { LoginGuardGuard, AdminGuard } from "../services/service.index";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { HospitalesComponent } from "./hospitales/hospitales.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { MedicoComponent } from "./medicos/medico.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { titulo: "Dashboard" }
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Process" }
      },
      {
        path: "graficas1",
        component: Graficas1Component,
        data: { titulo: "Graficas" }
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" }
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes del Tema" }
      },
      { path: "rxjs", component: RxjsComponent, data: { titulo: "RxJs" } },
      {
        path: "perfil",
        component: ProfileComponent,
        data: { titulo: "Perfil de usuario" }
      },
      {
        path: "busqueda/:termino",
        component: BusquedaComponent,
        data: { titulo: "Buscador" }
      },
      // Mantenimientos
      {
        path: "usuarios",
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: { titulo: "Mantenimiento de usuarios" }
      },
      {
        path: "hospitales",
        component: HospitalesComponent,
        data: { titulo: "Mantenimiento de hospitales" }
      },
      {
        path: "medicos",
        component: MedicosComponent,
        data: { titulo: "Mantenimiento de medicos" }
      },
      {
        path: "medico/:id",
        component: MedicoComponent,
        data: { titulo: "Actualizar medico" }
      },
      { path: "", pathMatch: "full", redirectTo: "/dashboard" }
    ]
  }
];
export const PagesRoutingModule = RouterModule.forChild(routes);
// @NgModule({
// 	imports: [RouterModule.forChild(routes)],
// 	exports: [RouterModule]
// })
// export class PagesRoutingModule {}
