import { TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { AuthService } from '../../core/services/auth.service';

describe('Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getUserEmail: () => 'test@test.com',
          },
        },
      ],
    });
  });

  it('should create dashboard component', () => {
    const fixture = TestBed.createComponent(Dashboard);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
