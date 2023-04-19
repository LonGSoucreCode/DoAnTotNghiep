import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputationmainFormComponent } from './reputationmain-form.component';

describe('ReputationmainFormComponent', () => {
  let component: ReputationmainFormComponent;
  let fixture: ComponentFixture<ReputationmainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReputationmainFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReputationmainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
