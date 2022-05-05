import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSaveComponent } from './first-save.component';

describe('FirstSaveComponent', () => {
  let component: FirstSaveComponent;
  let fixture: ComponentFixture<FirstSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
