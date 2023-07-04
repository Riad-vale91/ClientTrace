import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTraceFilterComponent } from './client-trace-filter.component';

describe('ClientTraceFilterComponent', () => {
  let component: ClientTraceFilterComponent;
  let fixture: ComponentFixture<ClientTraceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTraceFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTraceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
