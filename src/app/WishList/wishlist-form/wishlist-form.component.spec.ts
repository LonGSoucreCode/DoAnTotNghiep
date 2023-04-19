import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistFormComponent } from './wishlist-form.component';

describe('WishlistFormComponent', () => {
  let component: WishlistFormComponent;
  let fixture: ComponentFixture<WishlistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
