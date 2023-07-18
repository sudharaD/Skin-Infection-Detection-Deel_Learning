import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SethomeComponent } from './sethome.component';

describe('SethomeComponent', () => {
  let component: SethomeComponent;
  let fixture: ComponentFixture<SethomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SethomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SethomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
