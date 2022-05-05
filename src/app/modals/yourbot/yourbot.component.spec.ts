import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourbotComponent } from './yourbot.component';

describe('YourbotComponent', () => {
  let component: YourbotComponent;
  let fixture: ComponentFixture<YourbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
