import { Component, OnInit, Input } from '@angular/core';
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
  AddedList: string[];
  RemoveedList: string[];
  NoChangeList: string[];
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
  selector: 'app-venn',
  templateUrl: './venn.component.html',
  styleUrls: ['./venn.component.scss']
})


export class VennComponent implements OnInit {

  public venn: FormGroup;
  showParentDetails = [];
  showRemoveData = [];
  showRemoveNoChange = [];
  showRemoveAdded = [];
  showScanData = [];

  parentDeltas$: Observable<IParentDelta[]>;
  public parentHiddenInfo: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.venn = new FormGroup({
      CVVMinValue: new FormControl(),
      CVVMaxValue: new FormControl(),
      lastScanKeyValue: new FormControl(),
      currentScanKeyValue: new FormControl(),
      textOutput: new FormControl()
    });
  }

  presetValues() {
    this.venn.controls.CVVMinValue.setValue('0');
    this.venn.controls.CVVMaxValue.setValue('7');
    this.venn.controls.lastScanKeyValue.setValue('19f60d1e-56d4-4829-8118-536e66d78cc9');
    this.venn.controls.currentScanKeyValue.setValue('656150b6-bb90-442e-8c6d-40ccb35200bf');
  }

  fetchVennData(){
    const CVVMinVal = this.venn.controls.CVVMinValue.value;
    const CVVMaxVal = this.venn.controls.CVVMaxValue.value;
    const lastScanKey = this.venn.controls.lastScanKeyValue.value;
    const currentScanKey = this.venn.controls.currentScanKeyValue.value;
    const URL: string = 'http://109.228.55.115:65388/api/v2/deltas/current/' + currentScanKey + '/last/' + lastScanKey + '/cvss/' + CVVMinVal + '/' + CVVMaxVal;
    console.log(URL);
    this.parentDeltas$ = this.http.get<IParentDelta[]>(URL).do(console.log).map(data => _.values(data));
  }

  fetchVennDataLocal(){
    const CVVMinVal = this.venn.controls.CVVMinValue.value;
    const CVVMaxVal = this.venn.controls.CVVMaxValue.value;
    const lastScanKey = this.venn.controls.lastScanKeyValue.value;
    const currentScanKey = this.venn.controls.currentScanKeyValue.value;
    const URL: string = 'http://109.228.55.115:65388/api/v2/deltas/current/' + currentScanKey + '/last/' + lastScanKey + '/cvss/' + CVVMinVal + '/' + CVVMaxVal;
    console.log(URL);
    this.parentDeltas$ = this.http.get<IParentDelta[]>(URL).do(console.log).map(data => _.values(data));
  }
}
