import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWellComponent } from './view-well.component';

describe('ViewWellComponent', () => {
  let component: ViewWellComponent;
  let fixture: ComponentFixture<ViewWellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
