import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogYaslaraGoreComponent } from './blog-yaslara-gore.component';

describe('BlogYaslaraGoreComponent', () => {
  let component: BlogYaslaraGoreComponent;
  let fixture: ComponentFixture<BlogYaslaraGoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogYaslaraGoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogYaslaraGoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
