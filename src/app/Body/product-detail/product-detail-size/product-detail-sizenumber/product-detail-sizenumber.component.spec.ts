import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailSizenumberComponent } from './product-detail-sizenumber.component';

describe('ProductDetailSizenumberComponent', () => {
  let component: ProductDetailSizenumberComponent;
  let fixture: ComponentFixture<ProductDetailSizenumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailSizenumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailSizenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
