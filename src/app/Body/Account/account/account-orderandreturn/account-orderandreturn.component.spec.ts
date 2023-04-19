import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderandreturnComponent } from './account-orderandreturn.component';

describe('AccountOrderandreturnComponent', () => {
  let component: AccountOrderandreturnComponent;
  let fixture: ComponentFixture<AccountOrderandreturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrderandreturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOrderandreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
