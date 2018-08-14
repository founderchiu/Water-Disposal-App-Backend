import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWellsComponent } from './add-wells.component';

describe('AddWellsComponent', () => {
  let component: AddWellsComponent;
  let fixture: ComponentFixture<AddWellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
