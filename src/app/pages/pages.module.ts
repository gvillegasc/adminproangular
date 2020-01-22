import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";

import { SharedModule } from "../shared/shared.module";

import { PagesComponent } from "./pages.component";

import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

// Exportar components
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";

// Components de la carpeta components
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficaDonaComponent } from "../components/grafica-dona/grafica-dona.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

// Pipe Module
import { PipesModule } from "../pipes/pipes.module";
import { ProfileComponent } from "./profile/profile.component";
import { CommonModule } from "@angular/common";
import { UsuariosComponent } from "./usuarios/usuarios.component";

import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ]
})
export class PagesModule {}
