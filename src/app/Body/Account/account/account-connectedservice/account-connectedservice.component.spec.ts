import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConnectedserviceComponent } from './account-connectedservice.component';

describe('AccountConnectedserviceComponent', () => {
  let component: AccountConnectedserviceComponent;
  let fixture: ComponentFixture<AccountConnectedserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountConnectedserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountConnectedserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
