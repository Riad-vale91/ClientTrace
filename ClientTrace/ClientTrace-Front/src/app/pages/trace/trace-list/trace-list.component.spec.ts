import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceListComponent } from './trace-list.component';

describe('TraceListComponent', () => {
  let component: TraceListComponent;
  let fixture: ComponentFixture<TraceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
