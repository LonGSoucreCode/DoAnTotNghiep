import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagFormComponent } from './bag-form.component';

describe('BagFormComponent', () => {
  let component: BagFormComponent;
  let fixture: ComponentFixture<BagFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
