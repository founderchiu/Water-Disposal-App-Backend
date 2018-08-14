import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHaulerUserComponent } from './add-hauler-user.component';

describe('AddHaulerUserComponent', () => {
  let component: AddHaulerUserComponent;
  let fixture: ComponentFixture<AddHaulerUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHaulerUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHaulerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
