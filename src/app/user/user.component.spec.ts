import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        UserComponent
      ],
    }).compileComponents();
  }));


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [FormBuilder],


    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('se debe arrancar en el estado true el boton ecalcular y en false el boton enviar', () => {
    expect(component.showEnviar).toBe(false);
    expect(component.showCalcular).toBe(false);
  });


  it('deve existir un metodo llamado verSemana() ', () => {
    let metodoLlamado = spyOn(component, 'verSemanaI');
    component.verSemanaI();
    expect(metodoLlamado).toHaveBeenCalled();
  });

  it('deve existir un metodo llamado calcular() ', () => {
    let metodoLlamado = spyOn(component, 'calcular');
    component.calcular();
    expect(metodoLlamado).toHaveBeenCalled();

  });

  it('deve existir un metodo llamado saveServicio() ', () => {
    let metodoLlamado = spyOn(component, 'registrar');
    component.registrar();
    expect(metodoLlamado).toHaveBeenCalled();
  });
/* 
  it('deve existir un metodo llamado horasTrabajadas() ', () => {
    let metodoLlamado = spyOn(component, 'horasTrabajadas');
    component.horasTrabajadas();
    expect(metodoLlamado).toHaveBeenCalled();

  });

  it('se debe arrancar en el estado true el boton ecalcular y en false el boton enviar', () => {
    component.horasTrabajadas();
    expect(component.showEnviar).toBe(true);
    expect(component.showCalcular).toBe(false);
  }); */

});





