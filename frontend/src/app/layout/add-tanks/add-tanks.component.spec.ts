import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTanksComponent } from './add-tanks.component';

describe('AddTanksComponent', () => {
  let component: AddTanksComponent;
  let fixture: ComponentFixture<AddTanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
