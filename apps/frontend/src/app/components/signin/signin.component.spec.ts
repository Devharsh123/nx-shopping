import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/user';

import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let httpController: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      declarations: [SigninComponent],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;

    httpController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should provide native elemement',()=>{
    const data = fixture.nativeElement;
    expect(data.querySelector(".signin").textContent).toContain("Login")
  })
  it('Should false empty form',()=>{
    expect(component.loginForm.valid).toBeFalsy();
  })
  it('Should false empty email',()=>{
    let emailValidity = component.loginForm.controls['email'];
    expect(emailValidity.valid).toBeFalsy();
  })
  it('Should false empty password',()=>{
    let passwordValidity = component.loginForm.controls['password'];
    expect(passwordValidity.valid).toBeFalsy();
  })
  it('Should submit form with valid entries',()=>{
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("test@gmail.com");
    component.loginForm.controls['password'].setValue("test123");
    expect(component.loginForm.valid).toBeTruthy();  
  })

  it('Should provide access-token',()=>{
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue("test@gmail.com");
    component.loginForm.controls['password'].setValue("test123");
    expect(component.loginForm.valid).toBeTruthy();
   
    const data = {
      email: 'test@gmail.com',
      password: 'test123'
    }
   
    component.authService.loginUser(data).subscribe((res)=>{
      expect(res).toStrictEqual(User);
    })
  })
});
