// Encargado para menjar las rutas
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard } from "../services/service.index";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

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

      // Mantenimientos
      {
        path: "usuarios",
        component: UsuariosComponent,
        data: { titulo: "Mantenimiento de usuarios" }
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
