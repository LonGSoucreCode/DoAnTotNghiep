import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconProductComponent } from './icon-product.component';

describe('IconProductComponent', () => {
  let component: IconProductComponent;
  let fixture: ComponentFixture<IconProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
