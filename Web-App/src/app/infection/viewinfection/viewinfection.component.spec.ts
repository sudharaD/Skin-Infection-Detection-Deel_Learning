import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinfectionComponent } from './viewinfection.component';

describe('ViewinfectionComponent', () => {
  let component: ViewinfectionComponent;
  let fixture: ComponentFixture<ViewinfectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinfectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
