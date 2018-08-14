import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHaulerAdminComponent } from './add-hauler-admin.component';

describe('AddHaulerAdminComponent', () => {
  let component: AddHaulerAdminComponent;
  let fixture: ComponentFixture<AddHaulerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHaulerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHaulerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
