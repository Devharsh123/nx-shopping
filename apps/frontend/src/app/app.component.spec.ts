import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { routes } from './app-routing.module';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent, NxWelcomeComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  describe('Routing module',()=>{
    it('navigate to "" redirects to log-in', fakeAsync(()=>{
      router.navigate(['']);
      tick();
      expect(location.path()).toBe('/log-in');
    }))

    it('navigate to log-in redirects to log-in', fakeAsync(()=>{
      router.navigate(['log-in']);
      tick();
      expect(location.path()).toBe('/log-in');
    }))

    it('navigate to sign-up redirects to sign-up', fakeAsync(()=>{
      router.navigate(['sign-up']);
      tick();
      expect(location.path()).toBe('/sign-up');
    }))

    it('navigate wrong url redirects to not found component', fakeAsync(()=>{
      router.navigate(['**']);
      tick();
      expect(location.path()).toBe('/**');
    }))
  })

});
