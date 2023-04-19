import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgProductBagComponent } from './img-product-bag.component';

describe('ImgProductBagComponent', () => {
  let component: ImgProductBagComponent;
  let fixture: ComponentFixture<ImgProductBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgProductBagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgProductBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
