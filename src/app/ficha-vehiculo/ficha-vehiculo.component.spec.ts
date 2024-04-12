import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaVehiculoComponent } from './ficha-vehiculo.component';

describe('FichaVehiculoComponent', () => {
  let component: FichaVehiculoComponent;
  let fixture: ComponentFixture<FichaVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaVehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FichaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
