import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { LoginData, User } from '../../shared/user';

@Component({
  selector: 'nx-shopping-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authApi: AuthService,
    private router: Router,
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }
  onLogin(form: FormGroup){
    const payload: LoginData ={
      email: form.value.email,
      password: form.value.password
    }

    this.authApi.loginUser(payload).subscribe((res: any)=>{
      console.log(res)
      if(res.access_token){
       this.authApi.storeUserData(res.access_token)
       this.router.navigate(['/user-profile'])
      }
    })

  }
}
