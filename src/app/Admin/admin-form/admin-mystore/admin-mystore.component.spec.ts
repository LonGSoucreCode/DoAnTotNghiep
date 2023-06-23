

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMystoreComponent } from './admin-mystore.component';

describe('AdminMystoreComponent', () => {
  let component: AdminMystoreComponent;
  let fixture: ComponentFixture<AdminMystoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMystoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMystoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
