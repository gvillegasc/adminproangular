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

// Components
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficaDonaComponent } from "../components/grafica-dona/grafica-dona.component";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [SharedModule, PagesRoutingModule, FormsModule, ChartsModule]
})
export class PagesModule {}
