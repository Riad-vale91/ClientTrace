import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTraceListComponent } from './client-trace-list.component';

describe('ClientTraceListComponent', () => {
  let component: ClientTraceListComponent;
  let fixture: ComponentFixture<ClientTraceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTraceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTraceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
