import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistFormBagComponent } from './wishlist-form-bag.component';

describe('WishlistFormBagComponent', () => {
  let component: WishlistFormBagComponent;
  let fixture: ComponentFixture<WishlistFormBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistFormBagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistFormBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
