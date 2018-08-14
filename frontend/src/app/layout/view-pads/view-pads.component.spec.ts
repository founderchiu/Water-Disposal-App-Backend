import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPadsComponent } from './view-pads.component';

describe('ViewPadsComponent', () => {
  let component: ViewPadsComponent;
  let fixture: ComponentFixture<ViewPadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
