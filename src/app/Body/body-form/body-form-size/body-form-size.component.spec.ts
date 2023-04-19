import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFormSizeComponent } from './body-form-size.component';

describe('BodyFormSizeComponent', () => {
  let component: BodyFormSizeComponent;
  let fixture: ComponentFixture<BodyFormSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyFormSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyFormSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
