import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProductsComponent } from './panel-products.component';

describe('PanelProductsComponent', () => {
  let component: PanelProductsComponent;
  let fixture: ComponentFixture<PanelProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
