import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { AuthService } from '../../core/services/auth.service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getUserEmail: () => 'test@test.com',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return logged-in user email', () => {
    expect(component.userEmail()).toBe('test@test.com');
  });
});
