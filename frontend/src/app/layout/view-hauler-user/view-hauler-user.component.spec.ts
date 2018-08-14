import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHaulerUserComponent } from './view-hauler-user.component';

describe('ViewHaulerUserComponent', () => {
  let component: ViewHaulerUserComponent;
  let fixture: ComponentFixture<ViewHaulerUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHaulerUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHaulerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
