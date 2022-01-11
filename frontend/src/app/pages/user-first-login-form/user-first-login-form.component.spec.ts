import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFirstLoginFormComponent } from './user-first-login-form.component';

describe('UserFirstLoginFormComponent', () => {
  let component: UserFirstLoginFormComponent;
  let fixture: ComponentFixture<UserFirstLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFirstLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFirstLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
