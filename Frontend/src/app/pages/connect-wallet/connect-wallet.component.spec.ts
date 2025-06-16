import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectWalletComponent } from './connect-wallet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConnectWalletComponent', () => {
  let component: ConnectWalletComponent;
  let fixture: ComponentFixture<ConnectWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectWalletComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
