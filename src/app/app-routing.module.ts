// Encargado para menjar las rutas
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { RegisterComponent } from "./login/register.component";
import { PagesComponent } from "./pages/pages.component";
import { LoginGuardGuard } from "./services/service.index";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: "./pages/pages.module#PagesModule"
  },
  { path: "**", component: NopagefoundComponent }
];

// export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
// @NgModule({
// 	imports: [RouterModule.forRoot(routes, { useHash: true })],
// 	exports: [RouterModule]
// })

// export class AppRoutingModule {}
