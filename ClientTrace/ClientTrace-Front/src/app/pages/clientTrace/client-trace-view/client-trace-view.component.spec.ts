import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTraceViewComponent } from './client-trace-view.component';

describe('ClientTraceViewComponent', () => {
  let component: ClientTraceViewComponent;
  let fixture: ComponentFixture<ClientTraceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTraceViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTraceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
