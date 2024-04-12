import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstFunxxxComponent } from './first-funxxx.component';

describe('FirstFunxxxComponent', () => {
  let component: FirstFunxxxComponent;
  let fixture: ComponentFixture<FirstFunxxxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstFunxxxComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FirstFunxxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
