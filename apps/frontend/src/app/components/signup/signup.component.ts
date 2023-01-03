import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { LoginData } from '../../shared/user';

@Component({
  selector: 'nx-shopping-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  ngOnInit() {}
  onRegister(form: FormGroup) {

    const payload: LoginData = {
      email: form.value.email,
      password: form.value.password
    }

    this.authService.registerUser(payload).subscribe((res) => {
      if (res) {
        this.registerForm.reset();
        this.router.navigate(['log-in']);
      }
    });
  }
}
