import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailSizeComponent } from './product-detail-size.component';

describe('ProductDetailSizeComponent', () => {
  let component: ProductDetailSizeComponent;
  let fixture: ComponentFixture<ProductDetailSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
