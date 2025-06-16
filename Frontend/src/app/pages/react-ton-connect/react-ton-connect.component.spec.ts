import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactTonConnectComponent } from './react-ton-connect.component';

describe('ReactTonConnectComponent', () => {
  let component: ReactTonConnectComponent;
  let fixture: ComponentFixture<ReactTonConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactTonConnectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactTonConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
