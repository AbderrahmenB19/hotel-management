import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMyBookingComponent } from './find-my-booking.component';

describe('FindMyBookingComponent', () => {
  let component: FindMyBookingComponent;
  let fixture: ComponentFixture<FindMyBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindMyBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindMyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
