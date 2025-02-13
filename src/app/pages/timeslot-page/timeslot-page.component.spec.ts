import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotPageComponent } from './timeslot-page.component';

describe('TimeslotPageComponent', () => {
  let component: TimeslotPageComponent;
  let fixture: ComponentFixture<TimeslotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeslotPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeslotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
