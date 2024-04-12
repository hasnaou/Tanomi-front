import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInsideComponent } from './calendar-inside.component';

describe('CalendarInsideComponent', () => {
  let component: CalendarInsideComponent;
  let fixture: ComponentFixture<CalendarInsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarInsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
