import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSizeComponent } from './bill-size.component';

describe('BillSizeComponent', () => {
  let component: BillSizeComponent;
  let fixture: ComponentFixture<BillSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
