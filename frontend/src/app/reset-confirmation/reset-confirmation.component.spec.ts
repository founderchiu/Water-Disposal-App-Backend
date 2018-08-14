import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetConfirmationComponent } from './reset-confirmation.component';

describe('ResetConfirmationComponent', () => {
  let component: ResetConfirmationComponent;
  let fixture: ComponentFixture<ResetConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
