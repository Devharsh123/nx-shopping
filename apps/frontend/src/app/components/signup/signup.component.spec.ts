import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

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
      declarations: [SignupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

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
});
