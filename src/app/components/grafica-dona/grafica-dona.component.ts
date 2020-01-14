import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-grafica-dona",
  templateUrl: "./grafica-dona.component.html",
  styleUrls: []
})
export class GraficaDonaComponent implements OnInit {
  @Input("chartLabels") doughnutChartLabel: string[] = [];
  @Input("chartData") doughnutChartData: number[] = [];
  @Input("chartType") doughnutChartType: string = "";
  @Input() leyenda: string;

  constructor() {}

  ngOnInit() {}
}
