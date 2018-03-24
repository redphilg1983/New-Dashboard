import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedBarChartComponent } from './advanced-bar-chart.component';

describe('AdvancedBarChartComponent', () => {
  let component: AdvancedBarChartComponent;
  let fixture: ComponentFixture<AdvancedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
