import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAileEgitimiComponent } from './blog-aile-egitimi.component';

describe('BlogAileEgitimiComponent', () => {
  let component: BlogAileEgitimiComponent;
  let fixture: ComponentFixture<BlogAileEgitimiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogAileEgitimiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAileEgitimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
