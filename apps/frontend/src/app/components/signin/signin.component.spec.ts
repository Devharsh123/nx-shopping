import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [SigninComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
