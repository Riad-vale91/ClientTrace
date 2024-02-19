import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceFilterComponent } from './trace-filter.component';

describe('TraceFilterComponent', () => {
  let component: TraceFilterComponent;
  let fixture: ComponentFixture<TraceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
