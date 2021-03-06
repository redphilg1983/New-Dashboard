import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { EchartsComponent } from './echarts/echarts.component';
import { D3Component } from './d3/d3.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { VennComponent } from './venn/venn.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AdvancedBarChartComponent } from './advanced-bar-chart/advanced-bar-chart.component'

const routes: Routes = [{
  path: '',
  component: ChartsComponent,
  children: [{
    path: 'echarts',
    component: EchartsComponent,
  }, {
    path: 'd3',
    component: D3Component,
  }, {
    path: 'chartjs',
    component: ChartjsComponent,
  }
    , {
    path: 'venn',
    component: VennComponent,
  }
    , {
    path: 'bar-chart',
    component: BarChartComponent,
  }
    , {
    path: 'advanced-bar-chart',
    component: AdvancedBarChartComponent,
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule { }

export const routedComponents = [
  ChartsComponent,
  EchartsComponent,
  D3Component,
  ChartjsComponent,
  VennComponent
];
