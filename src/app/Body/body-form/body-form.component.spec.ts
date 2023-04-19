import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFormComponent } from './body-form.component';

describe('BodyFormComponent', () => {
  let component: BodyFormComponent;
  let fixture: ComponentFixture<BodyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
