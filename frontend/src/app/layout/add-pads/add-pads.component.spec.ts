import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPadsComponent } from './add-pads.component';

describe('AddPadsComponent', () => {
  let component: AddPadsComponent;
  let fixture: ComponentFixture<AddPadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
