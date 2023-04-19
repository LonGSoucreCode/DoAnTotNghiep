import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBagComponent } from './price-bag.component';

describe('PriceBagComponent', () => {
  let component: PriceBagComponent;
  let fixture: ComponentFixture<PriceBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceBagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
