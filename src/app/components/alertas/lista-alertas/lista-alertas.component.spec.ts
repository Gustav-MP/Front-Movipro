import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlertasComponent } from './lista-alertas.component';

describe('ListaComponent', () => {
  let component: ListaAlertasComponent;
  let fixture: ComponentFixture<ListaAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlertasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
