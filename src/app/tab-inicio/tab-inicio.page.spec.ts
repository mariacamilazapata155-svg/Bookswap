import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabInicioPage } from './tab-inicio.page';

describe('TabInicioPage', () => {
  let component: TabInicioPage;
  let fixture: ComponentFixture<TabInicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
