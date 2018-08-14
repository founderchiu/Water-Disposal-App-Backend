import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyUsersComponent } from './view-company-users.component';

describe('ViewCompanyUsersComponent', () => {
  let component: ViewCompanyUsersComponent;
  let fixture: ComponentFixture<ViewCompanyUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompanyUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
