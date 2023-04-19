import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistFormSizeComponent } from './wishlist-form-size.component';

describe('WishlistFormSizeComponent', () => {
  let component: WishlistFormSizeComponent;
  let fixture: ComponentFixture<WishlistFormSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistFormSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistFormSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
