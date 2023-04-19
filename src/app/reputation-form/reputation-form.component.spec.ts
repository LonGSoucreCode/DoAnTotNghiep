import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputationFormComponent } from './reputation-form.component';

describe('ReputationFormComponent', () => {
  let component: ReputationFormComponent;
  let fixture: ComponentFixture<ReputationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReputationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReputationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
