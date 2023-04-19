import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillProductlistComponent } from './bill-productlist.component';

describe('BillProductlistComponent', () => {
  let component: BillProductlistComponent;
  let fixture: ComponentFixture<BillProductlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillProductlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillProductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
