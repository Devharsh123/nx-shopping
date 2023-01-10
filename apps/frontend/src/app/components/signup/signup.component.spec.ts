import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/user';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
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
      declarations: [SignupComponent],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
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
    expect(data.querySelector(".signup").textContent).toContain("Register")
  })
  it('Should false empty form',()=>{
    expect(component.registerForm.valid).toBeFalsy();
  })
  it('Should false empty email',()=>{
    let emailValidity = component.registerForm.controls['email'];
    expect(emailValidity.valid).toBeFalsy();
  })
  it('Should false empty password',()=>{
    let passwordValidity = component.registerForm.controls['password'];
    expect(passwordValidity.valid).toBeFalsy();
  })
  it('Should submit form with valid entries',()=>{
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['email'].setValue("test@gmail.com");
    component.registerForm.controls['password'].setValue("test123");
    expect(component.registerForm.valid).toBeTruthy();
  })

  it(' Should provide valid user',()=>{
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['email'].setValue("test@gmail.com");
    component.registerForm.controls['password'].setValue("test123");
    expect(component.registerForm.valid).toBeTruthy();

    const data = {
      email: 'test@gmail.com',
      password: 'test123'
    }
    component.authService.registerUser(data).subscribe((res)=>{
      expect(res).toStrictEqual(User);
    })

  })
});
