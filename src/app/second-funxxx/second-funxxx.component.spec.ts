import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFunxxxComponent } from './second-funxxx.component';

describe('SecondFunxxxComponent', () => {
  let component: SecondFunxxxComponent;
  let fixture: ComponentFixture<SecondFunxxxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondFunxxxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondFunxxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
