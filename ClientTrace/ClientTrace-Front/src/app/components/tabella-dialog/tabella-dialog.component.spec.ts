import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaDialogComponent } from './tabella-dialog.component';

describe('TabellaDialogComponent', () => {
  let component: TabellaDialogComponent;
  let fixture: ComponentFixture<TabellaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabellaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabellaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
