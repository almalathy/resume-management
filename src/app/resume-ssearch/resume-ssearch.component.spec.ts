import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSsearchComponent } from './resume-ssearch.component';

describe('ResumeSsearchComponent', () => {
  let component: ResumeSsearchComponent;
  let fixture: ComponentFixture<ResumeSsearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeSsearchComponent]
    });
    fixture = TestBed.createComponent(ResumeSsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
