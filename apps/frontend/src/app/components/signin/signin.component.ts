import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { LoginData } from '../../shared/user';

@Component({
  selector: 'nx-shopping-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
  ){}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  };
  onLogin(form: FormGroup){

    const payload: LoginData ={
      email: form.value.email,
      password: form.value.password
    }

    this.authService.loginUser(payload).subscribe((res: any)=>{
      if(res.access_token){
       this.authService.storeUserData(res.access_token)
       this.router.navigate(['/user-profile'])
      }
    })

  }
}
