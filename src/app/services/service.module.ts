import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService
} from "./service.index";
import { HttpClientModule } from "@angular/common/http";
import { LoginGuardGuard } from "./guards/login-guard.guard";

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard
  ],
  imports: [CommonModule, HttpClientModule]
})
export class ServiceModule {}
