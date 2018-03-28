import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeelingsDialogComponent } from './admin-feelings-dialog.component';

describe('AdminFeelingsDialogComponent', () => {
  let component: AdminFeelingsDialogComponent;
  let fixture: ComponentFixture<AdminFeelingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFeelingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeelingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
