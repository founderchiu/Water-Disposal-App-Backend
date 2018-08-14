import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyAdminComponent } from './add-company-admin.component';

describe('AddCompanyAdminComponent', () => {
  let component: AddCompanyAdminComponent;
  let fixture: ComponentFixture<AddCompanyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
