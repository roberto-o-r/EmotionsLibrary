import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeelingsComponent } from './admin-feelings.component';

describe('AdminFeelingsComponent', () => {
  let component: AdminFeelingsComponent;
  let fixture: ComponentFixture<AdminFeelingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFeelingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeelingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
