import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import * as _ from 'lodash';
import 'rxjs/Rx';

interface IParentDelta {
  ScanName: string;
  Parent: string;
  Deltas: IDeltas;
}

interface IDeltas {
  CurrentScanId: string;
  LastScanId: string;
  CurentDate: Date;
  LastDate: Date;
  Added: number;
  Removed: number;
  NoChange: number;
}

@Component({
  selector: 'app-advanced-bar-chart',
  templateUrl: './advanced-bar-chart.component.html',
  styleUrls: ['./advanced-bar-chart.component.scss']
})
export class AdvancedBarChartComponent implements OnInit {

  showParentDetails = [];
  showRemoveData = [];
  showRemoveNoChange = [];
  showRemoveAdded = [];
  showScanData = [];

  data: {};
  options: any;
  themeSubscription: any;

  parentDeltas$: Observable<IParentDelta[]>
  Deltas$: Observable<IDeltas[]>

  constructor(private theme: NbThemeService, private http: HttpClient) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Removed',
          data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
          borderColor: colors.success,
          backgroundColor: colors.success,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 8,
          pointHoverRadius: 10,
        }, {
          label: 'No Change',
          data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
          borderColor: colors.info,
          backgroundColor: colors.info,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 8,
          pointHoverRadius: 10,
        }, {
          label: 'Added',
          data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
          borderColor: colors.dangerLight,
          backgroundColor: colors.dangerLight,
          fill: false,
          pointRadius: 8,
          pointHoverRadius: 10,
        }],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  ngOnInit() {
    const URL: string = 'http://109.228.55.115:65388/api/v2/trends/scan/0e674111-e427-426d-adc5-128e30844ef0'
    this.parentDeltas$ = this.http.get<IParentDelta[]>(URL).do(console.log).map(data => _.values(data));
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
