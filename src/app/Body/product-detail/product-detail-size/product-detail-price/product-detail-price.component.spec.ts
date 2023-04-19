import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailPriceComponent } from './product-detail-price.component';

describe('ProductDetailPriceComponent', () => {
  let component: ProductDetailPriceComponent;
  let fixture: ComponentFixture<ProductDetailPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
