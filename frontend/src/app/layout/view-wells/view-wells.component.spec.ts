import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWellsComponent } from './view-wells.component';

describe('ViewWellsComponent', () => {
  let component: ViewWellsComponent;
  let fixture: ComponentFixture<ViewWellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
