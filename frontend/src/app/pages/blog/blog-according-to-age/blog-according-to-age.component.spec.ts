import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAccordingToAgeComponent } from './blog-according-to-age.component';

describe('BlogAccordingToAgeComponent', () => {
  let component: BlogAccordingToAgeComponent;
  let fixture: ComponentFixture<BlogAccordingToAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogAccordingToAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAccordingToAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
