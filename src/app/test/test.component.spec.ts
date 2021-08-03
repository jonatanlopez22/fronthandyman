import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#clicked() should toggle #isOn', () => {
    expect(component.isOn).toBeFalsy();
    component.clicked();
    expect(component.isOn).toBeTruthy();
    component.clicked();
    expect(component.isOn).toBeFalsy();
  });

  it('#clicked() should set #message to "is on"', () => {
    expect(component.message).toMatch(/Apagada/i);
    component.clicked();
    expect(component.message).toMatch(/Prendida/i);
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('cal');
  });

});
