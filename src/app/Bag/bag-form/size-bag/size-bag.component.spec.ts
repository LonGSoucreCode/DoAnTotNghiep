import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeBagComponent } from './size-bag.component';

describe('SizeBagComponent', () => {
  let component: SizeBagComponent;
  let fixture: ComponentFixture<SizeBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeBagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
