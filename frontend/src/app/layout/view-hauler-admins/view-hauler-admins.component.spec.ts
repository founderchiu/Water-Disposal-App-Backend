import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHaulerAdminsComponent } from './view-hauler-admins.component';

describe('ViewHaulerAdminsComponent', () => {
  let component: ViewHaulerAdminsComponent;
  let fixture: ComponentFixture<ViewHaulerAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHaulerAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHaulerAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
