import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AperfilPage } from './aperfil.page';

describe('AperfilPage', () => {
  let component: AperfilPage;
  let fixture: ComponentFixture<AperfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
