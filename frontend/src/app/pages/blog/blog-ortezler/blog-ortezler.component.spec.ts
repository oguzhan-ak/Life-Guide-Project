import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOrtezlerComponent } from './blog-ortezler.component';

describe('BlogOrtezlerComponent', () => {
  let component: BlogOrtezlerComponent;
  let fixture: ComponentFixture<BlogOrtezlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogOrtezlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOrtezlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
