import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistBagComponent } from './wishlist-bag.component';

describe('WishlistBagComponent', () => {
  let component: WishlistBagComponent;
  let fixture: ComponentFixture<WishlistBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistBagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
