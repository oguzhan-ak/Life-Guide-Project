import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSerebralPalsiComponent } from './blog-serebral-palsi.component';

describe('BlogSerebralPalsiComponent', () => {
  let component: BlogSerebralPalsiComponent;
  let fixture: ComponentFixture<BlogSerebralPalsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogSerebralPalsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSerebralPalsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
