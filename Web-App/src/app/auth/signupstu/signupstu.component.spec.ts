import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupstuComponent } from './signupstu.component';

describe('SignupstuComponent', () => {
  let component: SignupstuComponent;
  let fixture: ComponentFixture<SignupstuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupstuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupstuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
