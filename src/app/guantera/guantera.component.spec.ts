import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuanteraComponent } from './guantera.component';

describe('GuanteraComponent', () => {
  let component: GuanteraComponent;
  let fixture: ComponentFixture<GuanteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuanteraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuanteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
