import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewaboutComponent } from './viewabout.component';

describe('ViewaboutComponent', () => {
  let component: ViewaboutComponent;
  let fixture: ComponentFixture<ViewaboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewaboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
