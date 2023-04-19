import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistFormPriceComponent } from './wishlist-form-price.component';

describe('WishlistFormPriceComponent', () => {
  let component: WishlistFormPriceComponent;
  let fixture: ComponentFixture<WishlistFormPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistFormPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistFormPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
